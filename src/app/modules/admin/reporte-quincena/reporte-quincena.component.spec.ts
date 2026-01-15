import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteQuincenaComponent } from './reporte-quincena.component';

describe('ReporteQuincenaComponent', () => {
  let component: ReporteQuincenaComponent;
  let fixture: ComponentFixture<ReporteQuincenaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReporteQuincenaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReporteQuincenaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
