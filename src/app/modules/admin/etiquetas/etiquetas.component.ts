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
import qz from 'qz-tray';
import { OrganizacionFormComponent } from 'app/components/admin/organizacion-form/organizacion-form.component';
import { CantidadEtiquetasComponent } from 'app/components/admin/cantidad-etiquetas/cantidad-etiquetas.component';
import { MAT_DATE_FORMATS } from '@angular/material/core';

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'DD/MM/YYYY',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-etiquetas',
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
    
  templateUrl: './etiquetas.component.html',
  styleUrl: './etiquetas.component.scss'
})
export class EtiquetasComponent implements OnInit {
  cantidad = 1;
  isLoading: boolean = false;
  archivos = [] as File[];
  archivo;
  organizaciones = [];
  form: FormGroup;
  zpl = '';
  plantilla = `
  ^XA
^PW800
^LL400
^CI28

^CF0,28

^FO20,20
^FB760,1,0,C,0
^FDIMSS UMAE ESPECIALIDADES No. 25^FS

^CF0,22

^FO20,70
^FDClave:^FS
^FO180,70
^FD{{CLAVE}}^FS

^FO20,100
^FDDescripción:^FS
^FO180,100
^FB580,2,0,L,0
^FD{{DESCRIPCION}}^FS

^FO20,145
^FDEncargado:^FS
^FO180,145
^FD{{ENCARGADO}}^FS

^FO20,175
^FDLote:^FS
^FO180,175
^FD{{LOTE}}^FS

^FO20,205
^FDCaducidad:^FS
^FO180,205
^FD{{CADUCIDAD}}^FS

^FO20,235
^FDVigencia (días):^FS
^FO180,235
^FD{{VIGENCIADIAS}}^FS

^FO20,265
^FDVía Adm.:^FS
^FO180,265
^FD{{VIAADMINISTRACION}}^FS

^FO20,295
^FDFabricante:^FS
^FO180,295
^FD{{FABRICANTE}}^FS

^FO20,325
^FDNRS:^FS
^FO180,325
^FD{{NRS}}^FS

^FO420,205
^FDEmpaq:^FS
^FO520,205
^FD{{FECHAEMPAQUETADO}}^FS

^FO420,235
^FDVigencia:^FS
^FO520,235
^FD{{FECHADEVIGENCIA}}^FS

^XZ
  `;

  constructor(
    private fb: FormBuilder,
    private alertService: AlertService,
    private dialog: MatDialog,
    private admin_organizacionService: admin_OrganizacionService,
    private admin_configuracionService: admin_ConfiguracionService
  ) {
    this.form = this.fb.group({
      clave: ['', Validators.required],
      encargado: ['', Validators.required],
      descripcion: ['', Validators.required],
      lote: ['', Validators.required],
      caducidad: ['', Validators.required],
      vigencia: ['', Validators.required],
      viaDeAdministracion: ['', Validators.required],
      fabricante: ['', Validators.required],
      nrs: ['', Validators.required],
    });
  }


  ngOnInit(): void {
    this.loadData();
  }
  loadData() {
    /*
    forkJoin([this.admin_organizacionService.GetAll()]).subscribe({
      next: ([catOrganizacionResponse]) => {
        this.organizaciones = catOrganizacionResponse;
      },
      complete: () => { },
      error: (err) => {
        this.alertService.showError('Error', err.error);
      }
    });
    */
  }

  onFileSelected(event: any) {
    /*
    const file: File | null = event.target.files?.[0] ?? null;
    this.archivo = file;
    */
  }

  private formatDate(value: any): string {
  if (!value) return '';

  let date: Date;

  if (value instanceof Date) {
    date = value;
  } else {
    date = new Date(value);
  }

  if (isNaN(date.getTime())) {
    return '';
  }

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

  nuevaOrganizacion(): void {
    if (this.form.valid) {
      let clave = this.form.value.clave;
      let descripcion = this.form.value.descripcion;
      let encargado = this.form.value.encargado;
      let lote = this.form.value.lote;
      //let caducidad = this.form.value.caducidad;
      let vigenciaDias = this.form.value.vigencia;
      let viaDeAdministracion = this.form.value.viaDeAdministracion;
      let fabricante = this.form.value.fabricante;
      let nrs = this.form.value.nrs;

      const caducidadDate: Date = this.form.value.caducidad;
      let caducidad = this.formatDate(caducidadDate);

      const hoy = new Date();
      const fechaEmpaquetado = this.formatDate(hoy);

      const fechaVigenciaDate = new Date(hoy);
      fechaVigenciaDate.setDate(fechaVigenciaDate.getDate() + vigenciaDias);
      const fechaDeVigencia = this.formatDate(fechaVigenciaDate);



      const dialogRef = this.dialog.open(CantidadEtiquetasComponent, {
        width: '500px',
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          console.log(result.cantidad);
          this.zpl = this.plantilla
            .replace('{{CLAVE}}', clave)
            .replace('{{DESCRIPCION}}', descripcion)
            .replace('{{ENCARGADO}}', encargado)
            .replace('{{LOTE}}', lote)
            .replace('{{CADUCIDAD}}', caducidad)
            .replace('{{VIGENCIADIAS}}', vigenciaDias.toString())
            .replace('{{VIAADMINISTRACION}}', viaDeAdministracion)
            .replace('{{FABRICANTE}}', fabricante)
            .replace('{{NRS}}', nrs)
            .replace('{{FECHAEMPAQUETADO}}', fechaEmpaquetado)
            .replace('{{FECHADEVIGENCIA}}', fechaDeVigencia);
          this.Imprimir(result.cantidad)
          //this.loadData();
          // Aquí puedes llamar a tu servicio para guardar la nueva organización
        }
      });
    }

  }

  async Imprimir(cantidad) {
    try {
      // Conectar con QZ Tray


      if (!qz.websocket.isActive()) {
        await qz.websocket.connect();
      }

      const config = qz.configs.create("ZDesigner ZD421-203dpi ZPL");

      // 🔁 Imprimir N veces
      const trabajos = Array(cantidad).fill(this.zpl);

      await qz.print(config, trabajos);

      console.log(`Se imprimieron ${cantidad} etiquetas`);

    } catch (error) {
      console.error("Error al imprimir:", error);
    }
  }
}
