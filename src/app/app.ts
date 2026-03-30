import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

// AOS se declara globalmente desde el script en index.html

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit, AfterViewInit, OnDestroy {
  private routerSubscription?: Subscription;

  constructor(private router: Router) {}

  ngOnInit() {
    // Escuchar cambios de ruta para refrescar AOS
    this.routerSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        setTimeout(() => {
          this.initAOS();
        }, 300);
      });
  }

  ngAfterViewInit() {
    // Inicializar AOS después de que la vista esté lista
    setTimeout(() => {
      this.initAOS();
    }, 500);
  }

  private initAOS() {
    if (typeof window !== 'undefined' && typeof (window as any).AOS !== 'undefined') {
      try {
        (window as any).AOS.init({
          duration: 800,
          easing: 'ease-in-out',
          once: false,
          offset: 100,
          disable: false
        });
        (window as any).AOS.refresh();
      } catch (e) {
        console.warn('Error inicializando AOS:', e);
      }
    }
  }

  ngOnDestroy() {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }
}
