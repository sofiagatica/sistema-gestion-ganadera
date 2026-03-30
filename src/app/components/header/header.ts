import { Component, HostListener } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css'],
})
export class Header {

  isMenuOpen = false;
  isSidebarOpen = false;

  constructor(private auth: AuthService) {}

  get usuario(): string | null {
    return this.auth.getUsuario();
  }

  get rol(): string | null {
    return this.auth.getRol();
  }

  get rolNombre(): string {
  const r = (this.rol || '').toLowerCase();
  if (r === 'campo') return 'Personal de Campo';
  if (r === 'veterinario') return 'Veterinario';
  if (r === 'admin' || r === 'administracion') return 'Administración';
  return r || '';
}

  logout() {
    this.closeSidebar();
    this.auth.logout(); // vuelve a /roles
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
    document.body.style.overflow = this.isSidebarOpen ? 'hidden' : '';
  }

  closeSidebar() {
    this.isSidebarOpen = false;
    document.body.style.overflow = '';
  }

  @HostListener('window:resize')
  onResize() {
    if (window.innerWidth > 768) {
      this.isMenuOpen = false;
      this.isSidebarOpen = false;
      document.body.style.overflow = '';
    }
  }
}