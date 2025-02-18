import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerReportesComponent } from './ver-reportes.component';

describe('VerReportesComponent', () => {
  let component: VerReportesComponent;
  let fixture: ComponentFixture<VerReportesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerReportesComponent]
    });
    fixture = TestBed.createComponent(VerReportesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
