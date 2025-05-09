import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Importar los componentes
import { HomeComponent } from './components/home/home.component';
import { ReportarIncidenteComponent } from './components/reportar-incidente/reportar-incidente.component';
import { VerReportesComponent } from './components/ver-reportes/ver-reportes.component'; // Importación del nuevo componente
import { ForoComponent } from './components/foro/foro.component';

import { TemaComponent } from './components/tema/tema.component';

const routes: Routes = [
  { path: '', component: HomeComponent }, 
  { path: 'reportar-incidente', component: ReportarIncidenteComponent }, 
  { path: 'ver-reportes', component: VerReportesComponent }, 
  { path: 'foro', component: ForoComponent },
  { path: 'tema/:id', component: TemaComponent }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
