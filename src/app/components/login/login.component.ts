import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario = '';
  role = '';

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    // 👇 ACA LEEMOS EL ROL DESDE LA URL
    this.role = this.route.snapshot.paramMap.get('rol') || '';
  }

  ingresar() {
  const usuario = (this.usuario || '').trim();
  if (!usuario) return;

  // rol viene desde la URL: campo / veterinario / admin  (o lo que tengas)
  const rolRaw = (this.role || '').trim().toLowerCase();

  // Normaliza acentos (Administración -> administracion)
  const rol = rolRaw.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  this.authService.login(usuario, rol);

  // Mapa de redirección: acepta varias formas
  const rutasPorRol: Record<string, string> = {
    campo: '/alta-ganado',
    veterinario: '/gestion-sanitaria',
    admin: '/ventas',
    administracion: '/ventas'
  };

  const destino = rutasPorRol[rol] || '/roles';
  this.router.navigate([destino]);
}
}