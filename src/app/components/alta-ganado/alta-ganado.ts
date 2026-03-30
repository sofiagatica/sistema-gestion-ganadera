import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { DatosService } from '../../services/datos.service';

@Component({
  selector: 'app-alta-ganado',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './alta-ganado.html',
  styleUrls: ['./alta-ganado.css'],
})
export class AltaGanadoComponent implements OnInit {

  animal: any = this.getAnimalVacio();
  registrado = false;
  formErrors: any = {};
  submitted = false;
  modoEdicion = false;

  constructor(
    private router: Router,
    private datosService: DatosService
  ) {}

  ngOnInit(): void {
    const nav = history.state;

    if (nav?.animal) {
      this.animal = { ...nav.animal };
      this.modoEdicion = true;
    }
  }

  private getAnimalVacio() {
    return {
      caravana: '',
      tipo: 'Bovino',
      sexo: '',
      categoria: '',
      raza: '',
      fechaNac: '',
      peso: '',
      estado: '',
      estadoProductivo: '',
      lote: '',
      requiereControlVet: false,
      notas: ''
    };
  }

  validarFormulario(): boolean {

    this.formErrors = {};
    let esValido = true;

    if (!this.animal.caravana?.trim()) {
      this.formErrors.caravana = 'El número de caravana es obligatorio';
      esValido = false;
    }

    if (!this.animal.raza?.trim()) {
      this.formErrors.raza = 'La raza es obligatoria';
      esValido = false;
    }

    if (!this.animal.fechaNac) {
      this.formErrors.fechaNac = 'La fecha de nacimiento es obligatoria';
      esValido = false;
    }

    const pesoNum = parseFloat(this.animal.peso);

    if (!this.animal.peso || isNaN(pesoNum) || pesoNum <= 0) {
      this.formErrors.peso = 'El peso debe ser mayor a 0';
      esValido = false;
    }

    if (!this.animal.estado?.trim()) {
      this.formErrors.estado = 'El estado sanitario es obligatorio';
      esValido = false;
    }

    return esValido;
  }

  registrar() {

    this.submitted = true;

    if (!this.validarFormulario()) return;

    const caravana = this.animal.caravana.trim();

    if (this.modoEdicion && this.animal.id) {

      this.datosService.actualizarAnimal(this.animal.id, this.animal);

    } else {

      const existente = this.datosService.obtenerAnimalPorCaravana(caravana);

      if (existente) {
        this.formErrors.caravana = 'Ya existe un animal con esta caravana';
        return;
      }

      this.datosService.agregarAnimal({
        ...this.animal,
        tipo: 'Bovino',
        caravana
      });
    }

    this.registrado = true;
    this.submitted = false;
  }

  nuevoAnimal() {
    this.animal = this.getAnimalVacio();
    this.modoEdicion = false;
    this.registrado = false;
  }

  verListado() {
    this.router.navigate(['/listado-animales']);
  }

}