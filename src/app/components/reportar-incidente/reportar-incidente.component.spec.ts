import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportarIncidenteComponent } from './reportar-incidente.component';

describe('ReportarIncidenteComponent', () => {
  let component: ReportarIncidenteComponent;
  let fixture: ComponentFixture<ReportarIncidenteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReportarIncidenteComponent]
    });
    fixture = TestBed.createComponent(ReportarIncidenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
