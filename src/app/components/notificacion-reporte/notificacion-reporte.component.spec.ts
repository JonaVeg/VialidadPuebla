import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificacionReporteComponent } from './notificacion-reporte.component';

describe('NotificacionReporteComponent', () => {
  let component: NotificacionReporteComponent;
  let fixture: ComponentFixture<NotificacionReporteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotificacionReporteComponent]
    });
    fixture = TestBed.createComponent(NotificacionReporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
