import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, matDialogAnimations, MatDialogActions, MatDialogContent } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField, MatFormFieldControl, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { admin_OrganizacionService } from 'app/services/admin/admin_organizacion.service';
import { admin_ConceptosService } from 'app/services/admin/admin_conceptos.service';
import { AlertService } from 'app/services/alert.service';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cantidad-etiquetas',
  imports: [
    MatSelectModule,
        MatOptionModule,
        MatFormField,
        MatLabel,
        MatDialogActions,
        MatDialogContent,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatIcon,
        MatButton,
        MatInputModule,
        MatProgressSpinnerModule,
        CommonModule],
  templateUrl: './cantidad-etiquetas.component.html',
  styleUrl: './cantidad-etiquetas.component.scss'
})
export class CantidadEtiquetasComponent{
form: FormGroup;
  isEditMode: boolean = false;
  organizaciones = [];
  tipoConcepto =[{id:1, nombre:'Concepto'},{id:2, nombre:'Incidencia de entrada'},{id:3, nombre:'Incidencia de salida'}]
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CantidadEtiquetasComponent>,
    private admin_ConceptosService: admin_ConceptosService,
    private admin_organizacionService: admin_OrganizacionService,
    private alertService: AlertService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    this.isEditMode = !!this.data?.id;
    this.organizaciones = this.data?.organizaciones || [];
    console.log('',this.organizaciones);
    this.form = this.fb.group({
      cantidad:['', Validators.required]
    });
  }

  save(): void {
  if (this.form.valid) {
    this.form.disable();
    this.dialogRef.close(this.form.value);
  }
}

  cancel(): void {
    this.dialogRef.close();
  }

}
