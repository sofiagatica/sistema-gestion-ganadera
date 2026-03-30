import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DatosService } from '../../services/datos.service';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-reportes',
  imports: [CommonModule, RouterModule],
  templateUrl: './reportes.html',
  styleUrl: './reportes.css',
})
export class ReportesComponent implements OnInit {
  periodoSeleccionado = 'mes';
  categoriaSeleccionada = 'todas';
  tabActiva = 'stock'; // 'stock', 'sanitario', 'ventas', 'comparativo'

  stockTotal = 0;
  stockPorCategoria = {
    cria: 0,
    recria: 0,
    engorde: 0
  };

  ventasMensuales: any[] = [];
  historialSanitario: any[] = [];
  animales: any[] = [];
  ventas: any[] = [];
  comparativoPeriodos = {
    periodoActual: { ventas: 0, monto: 0, stock: 0 },
    periodoAnterior: { ventas: 0, monto: 0, stock: 0 }
  };

  estadisticasSanitarias = {
    totalRegistros: 0,
    vacunaciones: 0,
    tratamientos: 0,
    controles: 0,
    proximasVacunaciones: 0
  };

  estadisticasVentas = {
    totalVentas: 0,
    montoTotal: 0,
    promedioVenta: 0,
    ventasSociedadRural: 0,
    ventasPorTipo: {} as any
  };

  constructor(private datosService: DatosService) {}

  ngOnInit() {
    this.cargarDatos();
  }

  cargarDatos() {
    // Cargar stock desde animales registrados
    this.animales = this.datosService.obtenerAnimales();
    this.stockTotal = this.datosService.obtenerStockTotal();
    this.stockPorCategoria = this.datosService.obtenerStockPorCategoria();

    // Cargar historial sanitario
    this.historialSanitario = this.datosService.obtenerHistorialSanitario();
    this.calcularEstadisticasSanitarias();

    // Cargar ventas y procesarlas
    this.ventas = this.datosService.obtenerVentas();
    this.procesarVentas(this.ventas);
    this.calcularEstadisticasVentas();

    // Actualizar comparativo
    this.actualizarComparativo();
  }

  calcularEstadisticasSanitarias() {
    this.estadisticasSanitarias = {
      totalRegistros: this.historialSanitario.length,
      vacunaciones: this.historialSanitario.filter(r => r.tipoRegistro === 'Vacunación').length,
      tratamientos: this.historialSanitario.filter(r => r.tipoRegistro === 'Tratamiento').length,
      controles: this.historialSanitario.filter(r => r.tipoRegistro === 'Control Sanitario').length,
      proximasVacunaciones: this.historialSanitario.filter(r => {
        if (!r.proximaVacunacion) return false;
        const fechaProxima = new Date(r.proximaVacunacion);
        const hoy = new Date();
        return fechaProxima >= hoy;
      }).length
    };
  }

  calcularEstadisticasVentas() {
    const totalVentas = this.ventas.length;
    const montoTotal = this.ventas.reduce((sum, v) => sum + this.obtenerMontoVenta(v), 0);
    const promedioVenta = totalVentas > 0 ? montoTotal / totalVentas : 0;
    const ventasSociedadRural = this.ventas.filter(v => {
      const comp = (v.comprador || '').toString().toLowerCase();
      return comp.includes('sociedad rural');
    }).length;
    
    const ventasPorTipo: any = {};
    this.ventas.forEach(v => {
      const tipo = v.tipoOperacion || 'Sin especificar';
      if (!ventasPorTipo[tipo]) {
        ventasPorTipo[tipo] = { cantidad: 0, monto: 0 };
      }
      ventasPorTipo[tipo].cantidad += 1;
      ventasPorTipo[tipo].monto += this.obtenerMontoVenta(v);
    });

    this.estadisticasVentas = {
      totalVentas,
      montoTotal,
      promedioVenta,
      ventasSociedadRural,
      ventasPorTipo
    };
  }

  procesarVentas(ventas: any[]) {
    // Agrupar ventas según el período seleccionado
    const ventasAgrupadas: any = {};
    
    ventas.forEach(venta => {
      if (venta.fecha) {
        const fecha = new Date(venta.fecha);
        let periodo = '';
        
        if (this.periodoSeleccionado === 'mes') {
          const mes = fecha.toLocaleString('es-AR', { month: 'long', year: 'numeric' });
          periodo = mes.charAt(0).toUpperCase() + mes.slice(1);
        } else if (this.periodoSeleccionado === 'trimestre') {
          const trimestre = Math.floor(fecha.getMonth() / 3) + 1;
          periodo = `T${trimestre} ${fecha.getFullYear()}`;
        } else if (this.periodoSeleccionado === 'anual') {
          periodo = fecha.getFullYear().toString();
        }
        
        if (!ventasAgrupadas[periodo]) {
          ventasAgrupadas[periodo] = { cantidad: 0, monto: 0 };
        }
        ventasAgrupadas[periodo].cantidad += 1;
        ventasAgrupadas[periodo].monto += this.obtenerMontoVenta(venta);
      }
    });

    // Convertir a array y ordenar
    this.ventasMensuales = Object.keys(ventasAgrupadas)
      .map(periodo => ({
        mes: periodo,
        cantidad: ventasAgrupadas[periodo].cantidad,
        monto: ventasAgrupadas[periodo].monto
      }))
      .sort((a, b) => {
        // Ordenar por fecha (aproximado)
        return a.mes.localeCompare(b.mes);
      });
  }

  actualizarComparativo() {
    const ventas = this.datosService.obtenerVentas();
    const animales = this.datosService.obtenerAnimales();
    
    // Período actual (último mes)
    const ahora = new Date();
    const mesActual = ahora.getMonth();
    const añoActual = ahora.getFullYear();

    const ventasActuales = ventas.filter(v => {
      if (!v.fecha) return false;
      const fecha = new Date(v.fecha);
      return fecha.getMonth() === mesActual && fecha.getFullYear() === añoActual;
    });

    const montoActual = ventasActuales.reduce((sum, v) => sum + this.obtenerMontoVenta(v), 0);

    // Período anterior (mes anterior)
    const mesAnterior = mesActual === 0 ? 11 : mesActual - 1;
    const añoAnterior = mesActual === 0 ? añoActual - 1 : añoActual;

    const ventasAnteriores = ventas.filter(v => {
      if (!v.fecha) return false;
      const fecha = new Date(v.fecha);
      return fecha.getMonth() === mesAnterior && fecha.getFullYear() === añoAnterior;
    });

    const montoAnterior = ventasAnteriores.reduce((sum, v) => sum + this.obtenerMontoVenta(v), 0);

    this.comparativoPeriodos = {
      periodoActual: {
        ventas: ventasActuales.length,
        monto: montoActual,
        stock: this.stockTotal
      },
      periodoAnterior: {
        ventas: ventasAnteriores.length,
        monto: montoAnterior,
        stock: Math.max(0, this.stockTotal - ventasActuales.length)
      }
    };
  }

  cambiarPeriodo(periodo: string) {
    this.periodoSeleccionado = periodo;
    // Recargar datos cuando cambia el período
    this.cargarDatos();
  }

  cambiarCategoria(categoria: string) {
    this.categoriaSeleccionada = categoria;
  }

  formatearMonto(monto: number): string {
    return monto.toLocaleString('es-AR');
  }

  getMontoNumero(valor: any): number {
    return parseFloat(valor) || 0;
  }

  /** Obtiene el monto de una venta (las ventas usan 'total', historial usa 'monto') */
  obtenerMontoVenta(venta: any): number {
    const t = venta?.total;
    const m = venta?.monto;
    if (t != null && t !== '') return parseFloat(t) || 0;
    if (m != null && m !== '') return parseFloat(m) || 0;
    return 0;
  }

  /** Obtiene las caravanas de una venta (ventas tienen animales[], historial tiene caravana) */
  getCaravanasVenta(venta: any): string {
    if (venta?.animales?.length) {
      return venta.animales.map((a: any) => a.caravana).join(', ');
    }
    return venta?.caravana || '-';
  }

  calcularPromedio(monto: number, cantidad: number): string {
    if (cantidad === 0) return '0.00';
    return (monto / cantidad).toLocaleString('es-AR', {maximumFractionDigits: 2});
  }

  getTotalVentas(): number {
    return this.ventasMensuales.reduce((sum, v) => sum + v.cantidad, 0);
  }

  getTotalMonto(): number {
    return this.ventasMensuales.reduce((sum, v) => sum + v.monto, 0);
  }

  getVariacionVentas(): number {
    return this.comparativoPeriodos.periodoActual.ventas - this.comparativoPeriodos.periodoAnterior.ventas;
  }

  getVariacionMonto(): number {
    return this.comparativoPeriodos.periodoActual.monto - this.comparativoPeriodos.periodoAnterior.monto;
  }

  getVariacionStock(): number {
    return this.comparativoPeriodos.periodoActual.stock - this.comparativoPeriodos.periodoAnterior.stock;
  }

  formatearFecha(fecha: string): string {
    if (!fecha) return '-';
    const date = new Date(fecha);
    return date.toLocaleDateString('es-AR');
  }

  getTiposOperacion(): string[] {
    return Object.keys(this.estadisticasVentas.ventasPorTipo);
  }

  calcularPorcentaje(valor: number, total: number): string {
    if (total === 0) return '0.00';
    return ((valor / total) * 100).toFixed(2);
  }

  getPorcentajeVariacion(actual: number, anterior: number): number {
    if (anterior === 0) return actual > 0 ? 100 : 0;
    return ((actual - anterior) / anterior) * 100;
  }

  tieneVentasPorTipo(): boolean {
    return Object.keys(this.estadisticasVentas.ventasPorTipo).length > 0;
  }

  cambiarTab(tab: string) {
    this.tabActiva = tab;
  }

  /** A. Listado de ventas ordenado por fecha (más reciente primero) */
  getVentasOrdenadas(): any[] {
    return [...this.ventas].sort((a, b) => {
      const fa = a.fecha ? new Date(a.fecha).getTime() : 0;
      const fb = b.fecha ? new Date(b.fecha).getTime() : 0;
      return fb - fa;
    });
  }

  /** Datos para gráfico de ventas por mes (siempre mensual) */
  getVentasParaGrafico(): { mes: string; cantidad: number; monto: number }[] {
    const ventasAgrupadas: any = {};
    this.ventas.forEach(venta => {
      if (venta.fecha) {
        const fecha = new Date(venta.fecha);
        const mes = fecha.toLocaleString('es-AR', { month: 'short', year: 'numeric' });
        const periodo = mes.charAt(0).toUpperCase() + mes.slice(1);
        if (!ventasAgrupadas[periodo]) {
          ventasAgrupadas[periodo] = { cantidad: 0, monto: 0 };
        }
        ventasAgrupadas[periodo].cantidad += 1;
        ventasAgrupadas[periodo].monto += this.obtenerMontoVenta(venta);
      }
    });
    return Object.keys(ventasAgrupadas)
      .map(periodo => ({
        mes: periodo,
        cantidad: ventasAgrupadas[periodo].cantidad,
        monto: ventasAgrupadas[periodo].monto
      }))
      .sort((a, b) => a.mes.localeCompare(b.mes));
  }

  getMaxMontoGrafico(): number {
    const datos = this.getVentasParaGrafico();
    if (datos.length === 0) return 1;
    return Math.max(...datos.map(d => d.monto), 1);
  }

  /** B. Generar PDF de factura/comprobante */
  descargarFacturaPDF(venta: any): void {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.setTextColor(34, 64, 42);
    doc.text('COMPROBANTE DE VENTA', 105, 25, { align: 'center' });
    doc.setFontSize(12);
    doc.setTextColor(80, 80, 80);
    doc.text('Sistema AgroSoft', 105, 35, { align: 'center' });

    doc.setDrawColor(34, 64, 42);
    doc.setLineWidth(0.5);
    doc.line(20, 42, 190, 42);

    let y = 55;
    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    doc.text('Caravana del animal: ' + (venta.caravana || '-'), 20, y);
    y += 10;
    doc.text('Fecha: ' + this.formatearFecha(venta.fecha), 20, y);
    y += 10;
    doc.text('Comprador: ' + (venta.comprador || '-'), 20, y);
    y += 10;
    doc.text('Monto: $ ' + this.formatearMonto(this.obtenerMontoVenta(venta)), 20, y);
    if (venta.tipoOperacion) {
      y += 10;
      doc.text('Tipo de operación: ' + venta.tipoOperacion, 20, y);
    }

    doc.setFontSize(8);
    doc.setTextColor(120, 120, 120);
    doc.text(
      'Documento generado el ' + new Date().toLocaleDateString('es-AR'),
      105,
      280,
      { align: 'center' }
    );

    const nombreArchivo = 'Comprobante_' + (venta.caravana || 'venta') + '_' + this.formatearFecha(venta.fecha).replace(/\//g, '-') + '.pdf';
    doc.save(nombreArchivo);
  }

  /** B. Imprimir factura */
  imprimirFactura(venta: any): void {
    const ventana = window.open('', '_blank');
    if (!ventana) return;
    ventana.document.write(`
      <!DOCTYPE html>
      <html>
      <head><title>Comprobante de Venta</title>
      <style>
        body { font-family: Arial, sans-serif; padding: 40px; max-width: 400px; margin: 0 auto; }
        h1 { color: #22402a; font-size: 20px; text-align: center; }
        .campo { margin: 15px 0; }
        .etiqueta { font-weight: bold; color: #666; }
        .valor { margin-top: 4px; font-size: 16px; }
        hr { border: none; border-top: 2px solid #22402a; margin: 20px 0; }
        .pie { font-size: 11px; color: #888; text-align: center; margin-top: 40px; }
      </style>
      </head>
      <body>
        <h1>COMPROBANTE DE VENTA</h1>
        <p style="text-align:center;color:#666;">Sistema AgroSoft</p>
        <hr>
        <div class="campo"><div class="etiqueta">Caravana del animal</div><div class="valor">${venta.caravana || '-'}</div></div>
        <div class="campo"><div class="etiqueta">Fecha</div><div class="valor">${this.formatearFecha(venta.fecha)}</div></div>
        <div class="campo"><div class="etiqueta">Comprador</div><div class="valor">${venta.comprador || '-'}</div></div>
        <div class="campo"><div class="etiqueta">Monto</div><div class="valor">$ ${this.formatearMonto(this.obtenerMontoVenta(venta))}</div></div>
        ${venta.tipoOperacion ? `<div class="campo"><div class="etiqueta">Tipo de operación</div><div class="valor">${venta.tipoOperacion}</div></div>` : ''}
        <hr>
        <p class="pie">Documento generado el ${new Date().toLocaleDateString('es-AR')}</p>
      </body>
      </html>
    `);
    ventana.document.close();
    ventana.focus();
    ventana.print();
    ventana.onafterprint = () => ventana.close();
  }
}

