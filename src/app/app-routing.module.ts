import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Importar los componentes
import { HomeComponent } from './components/home/home.component';
import { ReportarIncidenteComponent } from './components/reportar-incidente/reportar-incidente.component';
import { VerReportesComponent } from './components/ver-reportes/ver-reportes.component'; // Importación del nuevo componente

const routes: Routes = [
  { path: '', component: HomeComponent }, // Página principal
  { path: 'reportar-incidente', component: ReportarIncidenteComponent }, // Página para reportar
  { path: 'ver-reportes', component: VerReportesComponent }, // Nueva página para ver reportes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
