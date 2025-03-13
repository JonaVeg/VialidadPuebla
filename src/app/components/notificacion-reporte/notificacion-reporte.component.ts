import { Component } from '@angular/core';

@Component({
  selector: 'app-notificacion-reporte',
  templateUrl: './notificacion-reporte.component.html',
  styleUrls: ['./notificacion-reporte.component.css']
})
export class NotificacionReporteComponent {
  mensaje = '';

  constructor() {}

  notificarUsuario() {
    this.mensaje = '📩 ¡Tu reporte ha sido enviado a las autoridades con éxito!';
  }
}
