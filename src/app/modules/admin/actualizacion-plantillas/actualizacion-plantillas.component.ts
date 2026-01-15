import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatDialog, MatDialogActions, MatDialogContent } from '@angular/material/dialog';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';
import { AlertService } from 'app/services/alert.service';
import { forkJoin } from 'rxjs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { admin_OrganizacionService } from 'app/services/admin/admin_organizacion.service';
import { admin_ConfiguracionService } from 'app/services/admin/admin_configuracion.service';

@Component({
  selector: 'app-actualizacion-plantillas',
  imports: [
    MatSelectModule,
    MatFormFieldModule,
    MatOptionModule,
    MatFormField,
    MatLabel,
    MatDialogActions,
    MatDialogContent,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatRadioModule,
    MatIcon,
    MatTooltipModule,
    MatButton,
    MatInputModule,
    CommonModule,
    MatProgressSpinnerModule],
  templateUrl: './actualizacion-plantillas.component.html',
  styleUrl: './actualizacion-plantillas.component.scss'
})
export class ActualizacionPlantillasComponent implements OnInit {
  isLoading: boolean = false;
  archivos = [] as File[];
  archivo;
  organizaciones = [];
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private alertService: AlertService,
    private dialog: MatDialog,
    private admin_organizacionService: admin_OrganizacionService,
    private admin_configuracionService: admin_ConfiguracionService
  ) {
    this.form = this.fb.group({
      quincena: ['', Validators.required],
      organizacion: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadData();
  }
  loadData() {
    forkJoin([this.admin_organizacionService.GetAll()]).subscribe({
      next: ([catOrganizacionResponse]) => {
        this.organizaciones = catOrganizacionResponse;
      },
      complete: () => { },
      error: (err) => {
        this.alertService.showError('Error', err.error);
      }
    });
  }

  onFileSelected(event: any) {
    const file: File | null = event.target.files?.[0] ?? null;
    this.archivo = file;
  }

  guardarReporte() {
    this.form.disable();
    const request = new FormData();
    request.append('OrganizacionId', this.form.value.organizacion);
    request.append('Quincena', this.form.value.quincena);
    request.append('Archivo', this.archivo);

    this.isLoading = true;
    
    this.admin_configuracionService.ActualizarReporteDeConceptos(request)
      .subscribe({
        next: (response) => { this.alertService.showSuccess('UMAE Especialidades NL', 'Reporte actualizado correctamente.'); this.form.enable(); this.form.reset(); },
        error: (err) => { this.alertService.showError('Error', err.error); this.form.enable();},
      })
      
    // Aquí enviarías al backend o servicio correspondiente
  }
}
