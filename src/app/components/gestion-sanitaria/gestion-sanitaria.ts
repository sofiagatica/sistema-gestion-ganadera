import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { DatosService } from '../../services/datos.service';

@Component({
  selector: 'app-gestion-sanitaria',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './gestion-sanitaria.html',
  styleUrl: './gestion-sanitaria.css',
})
export class GestionSanitariaComponent implements OnInit {

  registro: any = {
    caravana: '',
    fecha: '',
    tipoRegistro: '',
    medicamento: '',
    dosis: '',
    veterinario: '',
    observaciones: '',
    proximaVacunacion: '',
    diagnostico: ''
  };

  registrosSanitarios: any[] = [];
  registrado = false;
  filtroCaravana = '';
  formErrors: any = {};
  submitted = false;

  alertaVacunas: string[] = [];
  mostrarAlerta = false;

  constructor(
    private router: Router,
    private datosService: DatosService
  ) {}

  ngOnInit() {

    const navState: any = history.state;

    if (navState && navState.animal) {
      this.prefillFromAnimal(navState.animal);
    }

    this.cargarRegistros();
    this.verificarVacunacionesPendientes();
  }

  prefillFromAnimal(animal: any) {
    this.registro.caravana = animal.caravana || '';
  }

  cargarRegistros() {

    this.registrosSanitarios = this.datosService.obtenerHistorialSanitario();

    if (this.filtroCaravana) {
      this.registrosSanitarios = this.registrosSanitarios.filter(
        r => r.caravana === this.filtroCaravana
      );
    }
  }

  buscarAnimalPorCaravana() {

    if (this.registro.caravana) {

      const animal = this.datosService.obtenerAnimalPorCaravana(this.registro.caravana);

      if (!animal) {
        alert('No se encontró un animal con esa caravana. Verifique el número.');
      }

    }
  }

  obtenerHistorialPorCaravana(caravana: string) {
    return this.datosService.obtenerHistorialPorCaravana(caravana);
  }

  validarFormulario(): boolean {

    this.formErrors = {};
    let esValido = true;

    if (!this.registro.caravana || this.registro.caravana.trim() === '') {
      this.formErrors.caravana = 'El número de caravana es obligatorio';
      esValido = false;
    }

    if (!this.registro.fecha) {
      this.formErrors.fecha = 'La fecha del registro es obligatoria';
      esValido = false;
    }

    if (!this.registro.tipoRegistro || this.registro.tipoRegistro.trim() === '') {
      this.formErrors.tipoRegistro = 'El tipo de registro es obligatorio';
      esValido = false;
    }

    if (!this.registro.medicamento || this.registro.medicamento.trim() === '') {
      this.formErrors.medicamento = 'Debe ingresar un medicamento o vacuna';
      esValido = false;
    }

    return esValido;
  }

  registrar() {

    this.submitted = true;

    if (!this.validarFormulario()) {
      return;
    }

    const registroCompleto = {
      ...this.registro,
      fechaRegistro: new Date()
    };

    this.datosService.agregarRegistroSanitario(registroCompleto);

    this.cargarRegistros();

    this.registrado = true;
    this.submitted = false;

    setTimeout(() => {

      this.registro = {
        caravana: this.registro.caravana,
        fecha: '',
        tipoRegistro: '',
        medicamento: '',
        dosis: '',
        veterinario: '',
        observaciones: '',
        proximaVacunacion: '',
        diagnostico: ''
      };

      this.registrado = false;

    }, 3000);
  }

  filtrarPorCaravana() {
    this.cargarRegistros();
  }

  limpiarFiltro() {
    this.filtroCaravana = '';
    this.cargarRegistros();
  }

  formatearFecha(fecha: string): string {

    if (!fecha) return '';

    const partes = fecha.split('-');

    if (partes.length !== 3) return fecha;

    const anio = partes[0];
    const mes = partes[1];
    const dia = partes[2];

    return `${dia}/${mes}/${anio}`;
  }

  mostrarTodos() {

    this.registro.caravana = '';
    this.filtroCaravana = '';
    this.cargarRegistros();

  }

  eliminarRegistro(id: number) {

    if (!confirm('¿Eliminar este registro sanitario?')) {
      return;
    }

    this.datosService.eliminarRegistroSanitario(id);
    this.cargarRegistros();
  }

  verificarVacunacionesPendientes() {

    const hoy = new Date();
    const hoyStr = hoy.toISOString().split('T')[0]; // formato YYYY-MM-DD

    const pendientes = this.registrosSanitarios.filter(reg => {

      if (!reg.proximaVacunacion) return false;

      return reg.proximaVacunacion === hoyStr;
    });

    if (pendientes.length > 0) {

      this.alertaVacunas = pendientes.map(p =>
        `Caravana ${p.caravana} - Aplicación hoy`
      );

      this.mostrarAlerta = true;
    }
  }

}
