import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './registro.html',
  styleUrls: ['./registro.css'],
  host: {
    'class': 'registro-container'
  }
})
export class Registro {
  nombre: string = '';
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private router: Router, private http: HttpClient) {}

  onSubmit() {
    const datosRegistro = {
      nombre: this.nombre,
      email: this.email,
      password: this.password
    };

    this.http.post('http://localhost:3000/misitio/usuarios/registro', datosRegistro)
      .subscribe({
        next: (response) => {
          alert('Usuario registrado exitosamente');
          this.router.navigate(['login']);
        },
        error: (error) => {
          alert('Error al registrar usuario: ' + error.error.error);
        }
      });
  }
}
