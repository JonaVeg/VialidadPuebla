import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms'; // Para usar ngModel


// 🔥 Importar Firebase
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from '../environments/environment';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ReportarIncidenteComponent } from './components/reportar-incidente/reportar-incidente.component';
import { HomeComponent } from './components/home/home.component';
import { VerReportesComponent } from './components/ver-reportes/ver-reportes.component';
import { ForoComponent } from './components/foro/foro.component';
import { TemaComponent } from './components/tema/tema.component';



@NgModule({
  declarations: [
    AppComponent,
    
    NavbarComponent,
    ReportarIncidenteComponent,
    HomeComponent,
    VerReportesComponent,
    ForoComponent,
    TemaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, // Necesario para formularios
    AngularFireModule.initializeApp(environment.firebaseConfig), // 🔥 Inicializar Firebase
    AngularFireStorageModule, // 🔥 Storage para subida de archivos
    AngularFirestoreModule // 🔥 Firestore para almacenar datos
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
