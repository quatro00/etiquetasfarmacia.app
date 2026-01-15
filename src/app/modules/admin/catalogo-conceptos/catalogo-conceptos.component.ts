import { ChangeDetectionStrategy, Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { fuseAnimations } from '@fuse/animations';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';


import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { ConceptoFormComponent } from 'app/components/admin/concepto-form/concepto-form.component';
import { admin_ConceptosService } from 'app/services/admin/admin_conceptos.service';
import { admin_OrganizacionService } from 'app/services/admin/admin_organizacion.service';
import { forkJoin } from 'rxjs';
import { AlertService } from 'app/services/alert.service';

@Component({
  selector: 'app-catalogo-conceptos',
  templateUrl: './catalogo-conceptos.component.html',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatIconModule,
    MatProgressBarModule,
    MatFormFieldModule,
    MatIcon,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule
  ],
  styles: [
      /* language=SCSS */
      `
              .inventory-grid {
                  grid-template-columns: 48px auto 40px;
  
                  @screen sm {
                      grid-template-columns: 48px auto 112px 72px;
                  }
  
                  @screen md {
                      grid-template-columns: 48px 112px auto 112px 72px;
                  }
  
                  @screen lg {
                      grid-template-columns: 48px 112px auto 112px 96px 96px 72px;
                  }
              }
          `,
    ],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: fuseAnimations,
})
export class CatalogoConceptosComponent {
searchInputControl: UntypedFormControl = new UntypedFormControl();
  isLoading: boolean = false;

  displayedColumns: string[] = ['clave', 'descripcion', 'tipoConcepto', 'activo', 'acciones'];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatSort) sort!: MatSort;
  organizaciones = [];
  constructor(
    private dialog: MatDialog,
    private admin_ConceptosService:admin_ConceptosService,
    private admin_organizacionService: admin_OrganizacionService,
    private alertService: AlertService,
  ) { }

  nuevaOrganizacion(): void {
    const dialogRef = this.dialog.open(ConceptoFormComponent, {
      width: '500px',
      data: {
        organizaciones: this.organizaciones
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadData();
        // Aquí puedes llamar a tu servicio para guardar la nueva organización
      }
    });
  }

  ngOnInit(): void {
    this.loadData();

    // Filtro por input
    this.searchInputControl.valueChanges.subscribe(value => {
      this.dataSource.filter = value.trim().toLowerCase();
    });

    this.dataSource.filterPredicate = (data, filter) => {
      return Object.values(data).some(value =>
        (value + '').toLowerCase().includes(filter)
      );
    };
  }

  activar(item){
    this.admin_ConceptosService.Reactivar(item.id)
    .subscribe({
      next: (response) => {
        this.loadData();
      },
      complete: () => {
        //this.btnLoading = false;
      },
      error: () => {
        //this.btnLoading = false;
      }
    })
  }

  desactivar(item){
    this.admin_ConceptosService.Desactivar(item.id)
    .subscribe({
      next: (response) => {
        this.loadData();
      },
      complete: () => {
        //this.btnLoading = false;
      },
      error: () => {
        //this.btnLoading = false;
      }
    })
  }

  editar(item){
    /*
    const dialogRef = this.dialog.open(OrganizacionFormComponent, {
    width: '500px',
    data: item, // Le pasas los datos para editar
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      // refresca lista o muestra notificación
      this.loadData();
    }
  });
  */
  }
  loadData(): void {
    //this.isLoading = true;
    //buscamos las organizaciones
    forkJoin([this.admin_organizacionService.GetAll(), this.admin_ConceptosService.GetAll()]).subscribe({
      next: ([catOrganizacionResponse, admin_ConceptosResponse]) => {
        this.organizaciones = catOrganizacionResponse;
        this.dataSource.data = admin_ConceptosResponse;
      },
      complete: () => { },
      error: (err) => {
        this.alertService.showError('Error', err.error);
      }
    });
  }
}
