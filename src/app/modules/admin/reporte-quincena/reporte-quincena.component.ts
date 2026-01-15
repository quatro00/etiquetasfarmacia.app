import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, UntypedFormControl } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialog, MatDialogActions, MatDialogContent } from '@angular/material/dialog';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { FuseCardComponent } from '@fuse/components/card';
import { admin_NotificacionService } from 'app/services/admin/admin_notificacion.service';
import { admin_OrganizacionService } from 'app/services/admin/admin_organizacion.service';
import { AlertService } from 'app/services/alert.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-reporte-quincena',
  imports: [
    MatSelectModule,
    MatFormFieldModule,
    MatOptionModule,
    MatFormField,
    MatLabel,
    MatTableModule,
    FuseCardComponent,
    MatDialogActions,
    MatDialogContent,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatRadioModule,
    MatIcon,
    MatTooltipModule,
    MatButton,
    MatInputModule,
    CommonModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './reporte-quincena.component.html',
  styleUrl: './reporte-quincena.component.scss'
})
export class ReporteQuincenaComponent {
searchInputControl: UntypedFormControl = new UntypedFormControl();
  isLoading: boolean = false;

  filtroTexto: string = '';
  filtroOrganizacion: string = '';

  organizaciones: any[] = [];
  quincenas: any[] = [];
  notificaciones: any[] = [];

  columnas: string[] = ['quincena', 'matricula', 'nombre', 'correo', 'detalle'];
  detalleColumnas: string[] = ['fecha', 'concepto', 'descripcion', 'incEnt', 'incSal'];

  expandedRow: any = null;

  organizacionControl = new FormControl('0');
  quincenaControl = new FormControl('0');

  dataSource = new MatTableDataSource<any>([]);

  constructor(
    private dialog: MatDialog,
    private admin_OrganizacionService: admin_OrganizacionService,
    private alertService: AlertService,
    private admin_NotificacionService: admin_NotificacionService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  onOrganizacionChange(event: MatSelectChange): void {
  console.log('Organización seleccionada:', event.value);
  this.admin_OrganizacionService.GetQuincenas(event.value).subscribe({
      next: (getQuincenasResponse) => {
        console.log(getQuincenasResponse);
        this.quincenas = getQuincenasResponse;
      },
      complete: () => { },
      error: () => {
        this.alertService.showError('Error', 'Ocurrió un error inesperado.');
      }
    });
}

  loadData() {
    this.dataSource.data = [];
    forkJoin([this.admin_OrganizacionService.GetAll()]).subscribe({
      next: ([organizacionResponse]) => {
        this.organizaciones = organizacionResponse;
      },
      complete: () => { },
      error: () => {
        this.alertService.showError('Error', 'Ocurrió un error inesperado.');
      }
    });
  }

  //metodos para marcar o desmarcar las filas
   /** Marcar / desmarcar una fila */
  
  /** ¿Todos seleccionados? */
  isAllSelected(): boolean {
    return this.dataSource.data.length > 0 &&
      this.dataSource.data.every(row => row.notificacion === true);
  }

  /** Marcar / desmarcar todos */
  toggleAll(event: MatCheckboxChange) {
    const checked = event.checked;
    this.dataSource.data.forEach(row => row.notificacion = checked);
  }

  toggleRow(row: any, event: MatCheckboxChange) {
    row.notificacion = event.checked;
  }

  /** Estado intermedio del checkbox header */
  isIndeterminate(): boolean {
    const selected = this.dataSource.data.filter(r => r.notificacion).length;
    return selected > 0 && selected < this.dataSource.data.length;
  }

  /** Botón: mostrar seleccionados */
  enviarCorreos() {
    const seleccionados = this.dataSource.data.filter(r => r.notificacion);
    this.isLoading = true;

    this.admin_NotificacionService.EnviarNotificaciones(seleccionados).subscribe({
      next: (data) => {
        this.isLoading = false;
        this.alertService.showSuccess('UMAE Especialidades NL', 'Notificaciones enviadas correctamente.');
      },
      error: (err) => {
        this.alertService.showError('Error', err.error);
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  isDetailRow = (_: any, row: any) => row === this.expandedRow;

  filteredTickets() {
    return this.notificaciones.filter(ticket => {
      const texto = this.filtroTexto.toLowerCase();
      return (
        (!this.filtroOrganizacion || ticket.organizacionId === this.filtroOrganizacion) &&
        (
          ticket.quincena.toLowerCase().includes(texto) ||
          ticket.matricula.toLowerCase().includes(texto) ||
          ticket.nombre.toLowerCase().includes(texto) ||
          ticket.fecha.toLowerCase().includes(texto) ||
          ticket.concepto.toLowerCase().includes(texto) ||
          ticket.descripcion.toLowerCase().includes(texto) ||
          ticket.incEnt.toLowerCase().includes(texto) ||
          ticket.incSal.toLowerCase().includes(texto) ||
          ticket.notificacion.toLowerCase().includes(texto)
        )
      );
    });
  }

  buscarNotificaciones() {

    
    if (this.organizacionControl.value == '0') { return; }
    if (this.quincenaControl.value == '0') { return; }
    this.isLoading = true;
    this.admin_NotificacionService.ConsultaNotificaciones({ organizacionId: this.organizacionControl.value, quincena: this.quincenaControl.value }).subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.alertService.showError('Error', err.error);
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

}
