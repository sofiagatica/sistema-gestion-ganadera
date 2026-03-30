import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ModalComponent } from '../modal/modal';

declare var AOS: any;

@Component({
  selector: 'app-funcionalidades',
  imports: [CommonModule, RouterModule, ModalComponent],
  templateUrl: './funcionalidades.html',
  styleUrl: './funcionalidades.css',
})
export class Funcionalidades implements OnInit, AfterViewInit {
  modalAbierto: string | null = null;

  funcionalidades = [
    {
      id: 'animales',
      icon: '🐄',
      titulo: 'Gestión de Animales',
      descripcion: 'Registro y seguimiento completo del inventario ganadero',
      detalles: 'Sistema completo para el registro de animales con información detallada: número de caravana, raza, peso, fecha de nacimiento, estado sanitario y observaciones. Permite mantener un control preciso del stock ganadero.',
      caracteristicas: [
        'Registro de animales con información completa',
        'Búsqueda por caravana',
        'Actualización de datos',
        'Historial por animal',
        'Clasificación por categorías'
      ],
      ruta: '/alta-ganado',
      disponible: true
    },
    {
      id: 'sanitaria',
      icon: '💉',
      titulo: 'Gestión Sanitaria',
      descripcion: 'Control de vacunaciones, tratamientos y controles veterinarios',
      detalles: 'Sistema integral para el seguimiento de la salud del ganado. Registra vacunaciones, tratamientos, diagnósticos y controles sanitarios con recordatorios de próximas acciones.',
      caracteristicas: [
        'Registro de vacunaciones',
        'Control de tratamientos',
        'Historial sanitario por animal',
        'Recordatorios de próximas vacunaciones',
        'Registro de veterinarios'
      ],
      ruta: '/gestion-sanitaria',
      disponible: true
    },
    {
      id: 'ventas',
      icon: '💰',
      titulo: 'Gestión de Ventas',
      descripcion: 'Registro de ventas y comercialización de animales',
      detalles: 'Sistema completo para la gestión de ventas de ganado. Registra ventas con información del comprador, monto, tipo de operación e integración con Sociedad Rural. Incluye historial de comercialización por animal o lote.',
      caracteristicas: [
        'Registro de ventas detallado',
        'Historial de comercialización',
        'Integración con Sociedad Rural',
        'Reportes de ventas',
        'Búsqueda por caravana'
      ],
      ruta: '/ventas',
      disponible: true
    },
    {
      id: 'reportes',
      icon: '📊',
      titulo: 'Reportes y Estadísticas',
      descripcion: 'Análisis y reportes del sistema',
      detalles: 'Genera reportes completos y estadísticas del sistema. Incluye análisis de stock, ventas mensuales, comparativos de períodos y gráficos de tendencias.',
      caracteristicas: [
        'Reportes de stock',
        'Análisis de ventas',
        'Comparativos de períodos',
        'Estadísticas por categoría',
        'Exportación de datos'
      ],
      ruta: '/reportes',
      disponible: true
    }
  ];

  ngOnInit() {
    // AOS se inicializará después
  }

  ngAfterViewInit() {
    // Refrescar AOS para esta página
    if (typeof AOS !== 'undefined') {
      setTimeout(() => {
        AOS.refresh();
      }, 100);
    }
  }

  abrirModal(id: string) {
    this.modalAbierto = id;
  }

  cerrarModal() {
    this.modalAbierto = null;
  }

  obtenerFuncionalidad(id: string) {
    return this.funcionalidades.find(f => f.id === id);
  }
}

