import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteSubidaComponent } from './reporte-subida.component';

describe('ReporteSubidaComponent', () => {
  let component: ReporteSubidaComponent;
  let fixture: ComponentFixture<ReporteSubidaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReporteSubidaComponent]
    });
    fixture = TestBed.createComponent(ReporteSubidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
