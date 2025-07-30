import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-calculadora',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './calculadora.html',
  styleUrl: './calculadora.css'
})
export class Calculadora {
  nombreUsuario: string = '';
  constructor(private router: Router, private http: HttpClient) {
    this.obtenerPerfil();
  }

  tiposGasto = [
    { nombre: 'Vivienda', valor: 0 },
    { nombre: 'Salud', valor: 0 },
    { nombre: 'Educación', valor: 0 },
    { nombre: 'Alimentación', valor: 0 },
    { nombre: 'Vestimenta', valor: 0 },
    { nombre: 'Turismo', valor: 0 }
  ];

  totalGastos: number | null = null;
  mensaje: string = '';

  obtenerPerfil() {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        this.http.get<any>('http://localhost:3000/misitio/usuarios/perfil', {
          headers: { Authorization: `Bearer ${token}` }
        }).subscribe({
          next: (data) => { this.nombreUsuario = data.nombre; },
          error: () => { this.nombreUsuario = ''; }
        });
      }
    }
  }

  calcularTotal() {
    this.totalGastos = this.tiposGasto.reduce((total, gasto) => total + Number(gasto.valor), 0);
    const now = new Date();
    const mes = now.getMonth() + 1;
    const anio = now.getFullYear();
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      // Guardar cada gasto individualmente
      this.tiposGasto.forEach(gasto => {
        if (gasto.valor > 0) {
          this.http.post('http://localhost:3000/misitio/gastos', {
            categoria: gasto.nombre,
            monto: gasto.valor,
            descripcion: '',
            mes,
            anio
          }, {
            headers: { Authorization: `Bearer ${token}` }
          }).subscribe({
            next: () => { this.mensaje = 'Gastos guardados correctamente.'; },
            error: (err) => { this.mensaje = 'Error al guardar gastos: ' + err.error?.error; }
          });
        }
      });
    }
  }

  navigate(path: string): void {
    this.router.navigate([path]);
  }

  cerrarSesion(): void {
    // Limpiar el token del localStorage
    localStorage.removeItem('token');
    
    // Limpiar otros datos de usuario si existen
    localStorage.removeItem('userId');
    localStorage.removeItem('userData');
    
    // Redirigir al home
    this.router.navigate(['/']);
  }
}
