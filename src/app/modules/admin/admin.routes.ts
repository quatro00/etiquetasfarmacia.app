import { Routes } from '@angular/router';
import { ExampleComponent } from 'app/modules/admin/example/example.component';
import { HomeComponent } from './home/home.component';
import { LayoutComponent } from 'app/layout/layout.component';
import { CatalogoConceptosComponent } from './catalogo-conceptos/catalogo-conceptos.component';
import { ActualizacionPlantillasComponent } from './actualizacion-plantillas/actualizacion-plantillas.component';
import { CatalogoOrganizacionesComponent } from './catalogo-organizaciones/catalogo-organizaciones.component';
import { NotificacionesComponent } from 'app/modules/admin/notificaciones/notificaciones.component';
import { ReporteTrabajadorComponent } from 'app/modules/admin/reporte-trabajador/reporte-trabajador.component';
import { ReporteQuincenaComponent } from 'app/modules/admin/reporte-quincena/reporte-quincena.component';

export default [
    {
        path: '',
        children: [
            { path: 'home', component: HomeComponent },
            { path: 'example', component: ExampleComponent },
            { path: 'catalogo-conceptos', component: CatalogoConceptosComponent },
            { path: 'catalogo-organizaciones', component: CatalogoOrganizacionesComponent },
            { path: 'actualizacion-plantillas', component: ActualizacionPlantillasComponent },
            { path: 'notificaciones', component: NotificacionesComponent },
            { path: 'reporte-trabajador', component: ReporteTrabajadorComponent },
            { path: 'reporte-quincena', component: ReporteQuincenaComponent },
        ]
    },
] as Routes;
