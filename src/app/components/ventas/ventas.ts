import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { DatosService } from '../../services/datos.service';

@Component({
  selector: 'app-ventas',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './ventas.html',
  styleUrls: ['./ventas.css']
})
export class VentasComponent implements OnInit {

  venta: any = {
    idVenta: '',
    caravana: '',
    tipoGanado: '',
    raza: '',
    sexo: '',
    categoria: '',
    lote: '',
    estadoSanitario: '',
    pesoActual: '',
    fechaNacimiento: '',
    precio: '',
    comprador: '',
    fecha: '',
    tipoOperacion: '',
    observaciones: ''
  };

  animalesVenta: any[] = [];

  totalVenta: number = 0;

  ventasRegistradas: any[] = [];

  registrada = false;
  formErrors: any = {};
  submitted = false;

  constructor(
    private router: Router,
    private datosService: DatosService
  ) {}

  ngOnInit() {

    this.ventasRegistradas = this.datosService.obtenerVentas();

    // generar ID al abrir pantalla
    this.venta.idVenta = this.generarIdVenta();

  }

  // =============================
  // GENERAR ID DE VENTA
  // =============================

  generarIdVenta(){

    const anio = new Date().getFullYear();

    const numero = this.ventasRegistradas.length + 1;

    const numeroFormateado = numero.toString().padStart(3,'0');

    return `VEN-${anio}-${numeroFormateado}`;

  }

  // =============================
  // BUSCAR ANIMAL POR CARAVANA
  // =============================

  buscarAnimalPorCaravana(){

    const animal = this.datosService.obtenerAnimalPorCaravana(this.venta.caravana);

    if(!animal){
      alert("No se encontró un animal con esa caravana");
      return;
    }

    this.venta.tipoGanado = animal.tipo;
    this.venta.raza = animal.raza;
    this.venta.sexo = animal.sexo;
    this.venta.categoria = animal.categoria;
    this.venta.lote = animal.lote;
    this.venta.estadoSanitario = animal.estado;
    this.venta.fechaNacimiento = animal.fechaNac;
    this.venta.pesoActual = animal.peso;

  }

  // =============================
  // AGREGAR ANIMAL A LA VENTA
  // =============================

  agregarAnimalVenta(){

    if(!this.venta.caravana){
      alert("Ingrese una caravana");
      return;
    }

    if(!this.venta.precio || this.venta.precio <= 0){
      alert("Ingrese el precio del animal");
      return;
    }

    const existe = this.animalesVenta.find(a => a.caravana === this.venta.caravana);

    if(existe){
      alert("Ese animal ya fue agregado a la venta");
      return;
    }

    const animalVenta = {
      caravana: this.venta.caravana,
      raza: this.venta.raza,
      pesoActual: this.venta.pesoActual,
      precio: parseFloat(this.venta.precio)
    };

    this.animalesVenta.push(animalVenta);

    this.calcularTotalVenta();

    // limpiar campos
    this.venta.caravana = '';
    this.venta.raza = '';
    this.venta.tipoGanado = '';
    this.venta.sexo = '';
    this.venta.categoria = '';
    this.venta.lote = '';
    this.venta.estadoSanitario = '';
    this.venta.fechaNacimiento = '';
    this.venta.pesoActual = '';
    this.venta.precio = '';

  }

  // =============================
  // ELIMINAR ANIMAL DE LA VENTA
  // =============================

  eliminarAnimalVenta(caravana: string){

    this.animalesVenta = this.animalesVenta.filter(a => a.caravana !== caravana);

    this.calcularTotalVenta();

  }

  // =============================
  // CALCULAR TOTAL
  // =============================

  calcularTotalVenta(){

    this.totalVenta = this.animalesVenta.reduce((sum, a) => sum + (a.precio || 0), 0);

  }

  // =============================
  // VALIDAR FORMULARIO
  // =============================

  validarFormulario(): boolean {

    this.formErrors = {};
    let esValido = true;

    if(this.animalesVenta.length === 0){
      alert("Debe agregar al menos un animal a la venta");
      esValido = false;
    }

    if(!this.venta.comprador || this.venta.comprador.trim() === ''){
      this.formErrors.comprador = 'El comprador es obligatorio';
      esValido = false;
    }

    if(!this.venta.fecha){
      this.formErrors.fecha = 'La fecha de venta es obligatoria';
      esValido = false;
    }

    if(!this.venta.tipoOperacion){
      this.formErrors.tipoOperacion = 'Seleccione el tipo de operación';
      esValido = false;
    }

    return esValido;

  }

  // =============================
  // REGISTRAR VENTA
  // =============================

  registrar(){

    this.submitted = true;

    if(!this.validarFormulario()){
      return;
    }

    const ventaRegistrada = {
      idVenta: this.venta.idVenta,
      animales: this.animalesVenta,
      cantidad: this.animalesVenta.length,
      total: this.totalVenta,
      comprador: this.venta.comprador,
      fecha: this.venta.fecha,
      tipoOperacion: this.venta.tipoOperacion,
      observaciones: this.venta.observaciones
    };

    this.datosService.agregarVenta(ventaRegistrada);

    this.ventasRegistradas = this.datosService.obtenerVentas();

    this.registrada = true;

    this.animalesVenta = [];
    this.totalVenta = 0;

    this.venta.comprador = '';
    this.venta.fecha = '';
    this.venta.tipoOperacion = '';
    this.venta.observaciones = '';

    // generar nuevo ID para próxima venta
    this.venta.idVenta = this.generarIdVenta();

  }

  // =============================
  // ELIMINAR VENTA
  // =============================

  eliminarVenta(id:number){

    if(!confirm("¿Eliminar esta venta?")) return;

    this.datosService.eliminarVenta(id);

    this.ventasRegistradas = this.datosService.obtenerVentas();

  }

  // =============================
  // FORMATEAR MONTO
  // =============================

  formatearMonto(monto:any){

    if(!monto) return "0";

    const num = typeof monto === "string" ? parseFloat(monto) : monto;

    return num.toLocaleString("es-AR");

  }

}

