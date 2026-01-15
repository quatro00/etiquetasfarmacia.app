import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteTrabajadorComponent } from './reporte-trabajador.component';

describe('ReporteTrabajadorComponent', () => {
  let component: ReporteTrabajadorComponent;
  let fixture: ComponentFixture<ReporteTrabajadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReporteTrabajadorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReporteTrabajadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
