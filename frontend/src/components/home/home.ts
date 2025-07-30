import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  constructor(private router: Router) {}

  // Corregir el método para que coincida con el template
  navigate(path: string): void {
    this.router.navigate([path]);
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

  calcularTotal() {
    this.totalGastos = this.tiposGasto.reduce((total, gasto) => total + Number(gasto.valor), 0);
  }
}
