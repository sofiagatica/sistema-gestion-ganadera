import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatosService {
  private animales: any[] = [];
  private ventas: any[] = [];
  private historialSanitario: any[] = [];
  private historiasComercializacion: any[] = [];

  // Métodos para animales
  agregarAnimal(animal: any) {
    const animalConId = {
      ...animal,
      id: Date.now(),
      fechaRegistro: new Date().toISOString()
    };
    this.animales.push(animalConId);
    // Guardar en localStorage para persistencia
    this.guardarEnLocalStorage();
    return animalConId;
  }

  obtenerAnimales() {
    this.cargarDesdeLocalStorage();
    return this.animales;
  }

  obtenerAnimalPorCaravana(caravana: string) {
    this.cargarDesdeLocalStorage();
    return this.animales.find(a => a.caravana === caravana);
  }

  actualizarAnimal(id: number, datosActualizados: any) {
    this.cargarDesdeLocalStorage();
    const index = this.animales.findIndex(a => a.id === id);
    if (index !== -1) {
      this.animales[index] = { ...this.animales[index], ...datosActualizados };
      this.guardarEnLocalStorage();
      return this.animales[index];
    }
    return null;
  }

  eliminarAnimal(id: number) {
  this.cargarDesdeLocalStorage();
  this.animales = this.animales.filter(a => a.id !== id);
  this.guardarEnLocalStorage();
}

  obtenerStockTotal(): number {
    this.cargarDesdeLocalStorage();
    return this.animales.length;
  }

  obtenerStockPorCategoria() {
    this.cargarDesdeLocalStorage();
    // Clasificar animales por categoría basado en edad/peso
    const cria = this.animales.filter(a => {
      const edad = this.calcularEdad(a.fechaNac);
      return edad < 12; // Menos de 1 año
    }).length;
    
    const recria = this.animales.filter(a => {
      const edad = this.calcularEdad(a.fechaNac);
      return edad >= 12 && edad < 24; // Entre 1 y 2 años
    }).length;
    
    const engorde = this.animales.filter(a => {
      const edad = this.calcularEdad(a.fechaNac);
      return edad >= 24; // Más de 2 años
    }).length;

    return { cria, recria, engorde };
  }

  private calcularEdad(fechaNac: string): number {
    if (!fechaNac) return 0;
    const nacimiento = new Date(fechaNac);
    const hoy = new Date();
    const diffTime = Math.abs(hoy.getTime() - nacimiento.getTime());
    const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30));
    return diffMonths;
  }

  // Métodos para ventas
  agregarVenta(venta: any) {
    const ventaConId = {
      ...venta,
      id: Date.now(),
      fechaRegistro: new Date().toISOString()
    };
    this.ventas.push(ventaConId);
    
    // Agregar a historial de comercialización
    this.agregarHistoriaComercializacion({
      caravana: venta.caravana,
      tipo: 'venta',
      fecha: venta.fecha,
      comprador: venta.comprador,
      monto: venta.monto,
      tipoOperacion: venta.tipoOperacion,
      pesoActual: venta.pesoActual,
      observaciones: venta.observaciones
    });
    
    this.guardarEnLocalStorage();
    return ventaConId;
  }

  obtenerVentas() {
    this.cargarDesdeLocalStorage();
    return this.ventas;
  }

  obtenerVentasPorCaravana(caravana: string) {
    this.cargarDesdeLocalStorage();
    return this.ventas.filter(v => v.caravana === caravana);
  }

  eliminarVenta(id: number) {
    this.cargarDesdeLocalStorage();
    this.ventas = this.ventas.filter(v => v.id !== id);
    this.guardarEnLocalStorage();
  }

  // Métodos para historial sanitario
  agregarRegistroSanitario(registro: any) {
    const registroConId = {
      ...registro,
      id: Date.now(),
      fechaRegistro: new Date().toISOString()
    };
    this.historialSanitario.push(registroConId);
    this.guardarEnLocalStorage();
    return registroConId;
  }

  obtenerHistorialSanitario() {
    this.cargarDesdeLocalStorage();
    return this.historialSanitario;
  }

  obtenerHistorialPorCaravana(caravana: string) {
    this.cargarDesdeLocalStorage();
    return this.historialSanitario.filter(h => h.caravana === caravana);
  }

  // Métodos para historias de comercialización
  agregarHistoriaComercializacion(historia: any) {
    const historiaConId = {
      ...historia,
      id: Date.now()
    };
    this.historiasComercializacion.push(historiaConId);
    this.guardarEnLocalStorage();
    return historiaConId;
  }

  obtenerHistoriasComercializacion() {
    this.cargarDesdeLocalStorage();
    return this.historiasComercializacion;
  }

  obtenerHistoriasPorCaravana(caravana: string) {
    this.cargarDesdeLocalStorage();
    return this.historiasComercializacion.filter(h => h.caravana === caravana);
  }

  obtenerHistoriasPorLote(loteId: string) {
    this.cargarDesdeLocalStorage();
    return this.historiasComercializacion.filter(h => h.loteId === loteId);
  }

  // Persistencia en localStorage
  private guardarEnLocalStorage() {
    localStorage.setItem('agrossoft_animales', JSON.stringify(this.animales));
    localStorage.setItem('agrossoft_ventas', JSON.stringify(this.ventas));
    localStorage.setItem('agrossoft_historial', JSON.stringify(this.historialSanitario));
    localStorage.setItem('agrossoft_historias_comercializacion', JSON.stringify(this.historiasComercializacion));
  }

  private cargarDesdeLocalStorage() {
    const animalesGuardados = localStorage.getItem('agrossoft_animales');
    const ventasGuardadas = localStorage.getItem('agrossoft_ventas');
    const historialGuardado = localStorage.getItem('agrossoft_historial');
    const historiasGuardadas = localStorage.getItem('agrossoft_historias_comercializacion');

    if (animalesGuardados) {
      this.animales = JSON.parse(animalesGuardados);
    }
    if (ventasGuardadas) {
      this.ventas = JSON.parse(ventasGuardadas);
    }
    if (historialGuardado) {
      this.historialSanitario = JSON.parse(historialGuardado);
    }
    if (historiasGuardadas) {
      this.historiasComercializacion = JSON.parse(historiasGuardadas);
    }
  }

  eliminarRegistroSanitario(id: number) {

    const registros = this.obtenerHistorialSanitario();

    const index = registros.findIndex(r => r.id === id);

    if (index !== -1) {
      registros.splice(index, 1);
    }

    localStorage.setItem('registrosSanitarios', JSON.stringify(registros));
  }
}

