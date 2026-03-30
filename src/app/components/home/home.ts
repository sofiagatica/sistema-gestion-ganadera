import { Component, AfterViewInit, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

declare var AOS: any;

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit, AfterViewInit {
  isAccordionOpen = false;

  ngOnInit() {
    // Asegurar que el contenido se muestre
  }

  ngAfterViewInit() {
    // Refrescar AOS cuando el componente se carga
    setTimeout(() => {
      if (typeof window !== 'undefined' && typeof (window as any).AOS !== 'undefined') {
        try {
          (window as any).AOS.refresh();
        } catch (e) {
          console.warn('Error refrescando AOS:', e);
        }
      }
    }, 300);
  }

  toggleAccordion() {
    this.isAccordionOpen = !this.isAccordionOpen;
  }
}

