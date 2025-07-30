import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { shareReplay, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-historialgasto',
  standalone: true,
  imports: [CommonModule, DecimalPipe, FormsModule],
  templateUrl: './historialgasto.html',
  styleUrl: './historialgasto.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Historialgasto implements OnInit {
  historial: any[] = [];
  mensaje: string = '';
  cargando: boolean = true;
  gastoEditando: any = null;
  nuevaDescripcion: string = '';
  gastoABorrar: any = null;
  nombreUsuario: string = '';

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    private zone: NgZone,
    private router: Router
  ) {}

  ngOnInit() {
    this.cargarHistorial();
    this.obtenerPerfil();
  }

  obtenerPerfil() {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        this.http.get<any>('http://localhost:3000/misitio/usuarios/perfil', {
          headers: { Authorization: `Bearer ${token}` }
        }).subscribe({
          next: (data) => {
            this.zone.run(() => {
              this.nombreUsuario = data.nombre;
              this.cdr.markForCheck();
            });
          },
          error: () => { this.nombreUsuario = ''; }
        });
      }
    }
  }

  volverACalculadora() {
    this.router.navigate(['/calculadora']);
  }

  cargarHistorial() {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (!token) return;

      const url = `http://localhost:3000/misitio/gastos?nocache=${Date.now()}`;
      this.http.get<any[]>(url, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .pipe(
        shareReplay(1),
        catchError(error => {
          console.error('Error:', error);
          this.mensaje = 'Error al cargar historial: ' + error.error?.error;
          return of([]);
        })
      )
      .subscribe({
        next: (data) => {
          this.zone.run(() => {
            console.log('Historial recibido:', data);
            this.historial = data;
            this.cargando = false;
            this.cdr.markForCheck();
          });
        }
      });
    }
  }

  editarDescripcion(gasto: any) {
    this.gastoEditando = gasto;
    this.nuevaDescripcion = gasto.descripcion;
  }

  cancelarEdicion() {
    this.gastoEditando = null;
    this.nuevaDescripcion = '';
  }

  guardarDescripcion() {
    if (!this.gastoEditando || !this.nuevaDescripcion.trim()) return;

    const token = localStorage.getItem('token');
    if (!token) return;

    const url = `http://localhost:3000/misitio/gastos/${this.gastoEditando._id}/descripcion`;
    this.http.put(url, {
      gastoId: this.gastoEditando._id,
      nuevaDescripcion: this.nuevaDescripcion.trim()
    }, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .pipe(
      catchError(error => {
        console.error('Error al actualizar:', error);
        this.mensaje = 'Error al actualizar la descripción: ' + error.error?.error;
        return of(null);
      })
    )
    .subscribe(response => {
      if (response) {
        // Actualizar la descripción en el historial local
        const gastoIndex = this.historial.findIndex(g => g._id === this.gastoEditando._id);
        if (gastoIndex !== -1) {
          this.historial[gastoIndex].descripcion = this.nuevaDescripcion.trim();
          this.cdr.markForCheck();
        }
        this.mensaje = 'Descripción actualizada con éxito';
      }
      this.gastoEditando = null;
      this.nuevaDescripcion = '';
    });
  }

  confirmarBorrado(gasto: any) {
    this.gastoABorrar = gasto;
  }

  cancelarBorrado() {
    this.gastoABorrar = null;
  }

  borrarGasto() {
    if (!this.gastoABorrar) return;

    const token = localStorage.getItem('token');
    if (!token) return;

    const url = `http://localhost:3000/misitio/gastos/${this.gastoABorrar._id}`;
    this.http.delete(url, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .pipe(
      catchError(error => {
        console.error('Error al eliminar:', error);
        this.mensaje = 'Error al eliminar el gasto: ' + error.error?.error;
        return of(null);
      })
    )
    .subscribe(response => {
      if (response) {
        // Eliminar el gasto del historial local
        this.historial = this.historial.filter(g => g._id !== this.gastoABorrar._id);
        this.mensaje = 'Gasto eliminado con éxito';
        this.cdr.markForCheck();
      }
      this.gastoABorrar = null;
    });
  }
}
