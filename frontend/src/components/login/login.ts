import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  host: {
    'class': 'login-container'
  }
})
export class Login {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private router: Router, private http: HttpClient) {}

  onSubmit() {
    const datosLogin = {
      email: this.email,
      password: this.password
    };

    this.http.post('http://localhost:3000/misitio/usuarios/login', datosLogin)
      .subscribe({
        next: (response: any) => {
          // Guardar el token en localStorage
          localStorage.setItem('token', response.token);
          this.errorMessage = '';
          this.router.navigate(['calculadora']);
        },
        error: (error) => {
          this.errorMessage = error.error.error || 'Error al iniciar sesión';
        }
      });
  }
}
