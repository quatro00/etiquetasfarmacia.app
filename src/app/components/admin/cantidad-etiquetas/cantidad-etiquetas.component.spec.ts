import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CantidadEtiquetasComponent } from './cantidad-etiquetas.component';

describe('CantidadEtiquetasComponent', () => {
  let component: CantidadEtiquetasComponent;
  let fixture: ComponentFixture<CantidadEtiquetasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CantidadEtiquetasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CantidadEtiquetasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
