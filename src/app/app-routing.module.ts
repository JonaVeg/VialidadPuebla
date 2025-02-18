import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Importar los componentes que se usarán en las rutas
import { ReporteSubidaComponent } from './components/reporte-subida/reporte-subida.component';
import { NavbarComponent } from './components/navbar/navbar.component';

const routes: Routes = [
  { path: '', component: ReporteSubidaComponent }, // Página principal
  { path: 'reportar', component: ReporteSubidaComponent }, // Página para reportar incidentes
  { path: 'reportes', component: ReporteSubidaComponent } // Sección donde se mostrarán reportes (ajústalo después)
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
