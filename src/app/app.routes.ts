import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { About } from './components/about/about';
import { Funcionalidades } from './components/funcionalidades/funcionalidades';
import { AltaGanadoComponent } from './components/alta-ganado/alta-ganado';
import { VentasComponent } from './components/ventas/ventas';
import { ReportesComponent } from './components/reportes/reportes';
import { GestionSanitariaComponent } from './components/gestion-sanitaria/gestion-sanitaria';
import { MetodologiaComponent } from './components/metodologia/metodologia';
import { RoleSelectorComponent } from './components/role-selector/role-selector.component';
import { LoginComponent } from './components/login/login.component';
import { ListadoAnimalesComponent } from './components/listado-animales/listado-animales.component';

export const routes: Routes = [

  { path: '', component: Home },               // pantalla verde
  { path: 'roles', component: RoleSelectorComponent }, // selección de rol
  { path: 'login/:rol', component: LoginComponent },
  { path: 'listado-animales', component: ListadoAnimalesComponent },

  { path: 'alta-ganado', component: AltaGanadoComponent },
  { path: 'ventas', component: VentasComponent },
  { path: 'gestion-sanitaria', component: GestionSanitariaComponent },
  { path: 'reportes', component: ReportesComponent },

  { path: '**', redirectTo: '' }
];