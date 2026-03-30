import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DatosService } from '../../services/datos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listado-animales',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './listado-animales.component.html',
  styleUrls: ['./listado-animales.component.css'],
})
export class ListadoAnimalesComponent implements OnInit {

  animales: any[] = [];

  busqueda: string = '';
  filtroEstado: string = '';

  constructor(private datosService: DatosService, private router: Router) {}

  ngOnInit(): void {
    this.cargarAnimales();
  }

  cargarAnimales() {
    this.animales = this.datosService.obtenerAnimales();
  }

  // ========================
  // FILTRO
  // ========================
  get animalesFiltrados() {
  return this.animales.filter(a => {

    const texto = this.busqueda.toLowerCase();

    const coincideBusqueda =
      !texto ||
      a.caravana?.toLowerCase().includes(texto) ||
      this.getCategoria(a.fechaNac).toLowerCase().includes(texto) ||
      a.estado?.toLowerCase().includes(texto);

    const coincideEstado =
      !this.filtroEstado || a.estado === this.filtroEstado;

    return coincideBusqueda && coincideEstado;
  });
}

  // ========================
  // EDAD
  // ========================
  getEdadMeses(fecha: string): number {
    if (!fecha) return 0;

    const hoy = new Date();
    const nacimiento = new Date(fecha);

    const meses =
      (hoy.getFullYear() - nacimiento.getFullYear()) * 12 +
      (hoy.getMonth() - nacimiento.getMonth());

    return meses;
  }

  // ========================
  // CATEGORIA AUTOMATICA
  // ========================
  getCategoria(fecha: string): string {
    const meses = this.getEdadMeses(fecha);

    if (meses < 6) return 'Ternero';
    if (meses < 12) return 'Recría';
    if (meses < 24) return 'Novillo';
    return 'Adulto';
  }

  // ========================
  // COLOR CHIP ESTADO
  // ========================
  chipClass(estado: string) {
    switch (estado) {
      case 'Sano':
        return 'chip-ok';
      case 'Vacunación Pendiente':
        return 'chip-warn';
      case 'En Tratamiento':
        return 'chip-bad';
      default:
        return '';
    }
  }

  // ========================
  // VER DETALLE
  // ========================
  editar(animal: any) {
    this.router.navigate(['/alta-ganado'], { state: { animal } });
  }

  // ========================
  // ELIMINAR
  // ========================
  eliminar(id: any) {
    if (!confirm('¿Eliminar animal?')) return;

    this.datosService.eliminarAnimal(id);
    this.cargarAnimales();
  }

}