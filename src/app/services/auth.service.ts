import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usuario: string | null = null;
  private rol: string | null = null;

  constructor(private router: Router) {}

  login(usuario: string, rol: string) {
    this.usuario = usuario;
    this.rol = rol;
  }

  logout() {
    this.usuario = null;
    this.rol = null;
    this.router.navigate(['/roles']);
  }

  getUsuario() {
    return this.usuario;
  }

  getRol() {
    return this.rol;
  }

  isLoggedIn(): boolean {
    return this.usuario !== null;
  }
}