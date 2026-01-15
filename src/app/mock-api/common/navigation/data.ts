/* eslint-disable */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation_admin: FuseNavigationItem[] = [
    {
        id   : 'home',
        title: 'Home',
        type : 'basic',
        icon : 'heroicons_outline:home',
        link : '/admin/home'
    },
    {
        id   : 'notificaciones',
        title: 'Notificaciones',
        type : 'basic',
        icon : 'heroicons_outline:envelope',
        link : '/admin/notificaciones'
    },
    {
        id      : 'administracion',
        title   : 'Administración',
        type    : 'collapsable',
        icon    : 'heroicons_outline:cog-6-tooth',
        children: [
            {
                id   : 'actualizacion-plantillas',
                title: 'Actualización de plantillas',
                type : 'basic',
                link : '/admin/actualizacion-plantillas'
            }
        ]
    },
    {
        id      : 'catalogos',
        title   : 'Catálogos',
        type    : 'collapsable',
        icon    : 'heroicons_outline:rectangle-stack',
        children: [
            {
                id   : 'organizaciones',
                title: 'Organizaciones',
                type : 'basic',
                link : '/admin/catalogo-organizaciones'
            },
            {
                id   : 'conceptos',
                title: 'Conceptos',
                type : 'basic',
                link : '/admin/catalogo-conceptos'
            }
        ]
    },
    {
        id      : 'reportes',
        title   : 'Reportes',
        type    : 'collapsable',
        icon    : 'heroicons_outline:document-chart-bar',
        children: [
            {
                id   : 'reporte-quincena',
                title: 'Reporte de quincena',
                type : 'basic',
                link : '/admin/reporte-quincena'
            }
        ]
    },
];
export const compactNavigation_admin: FuseNavigationItem[] = [
    {
        id   : 'example',
        title: 'Example',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/example'
    }
];
export const futuristicNavigation_admin: FuseNavigationItem[] = [
    {
        id   : 'example',
        title: 'Example',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/example'
    }
];
export const horizontalNavigation_admin: FuseNavigationItem[] = [
    {
        id   : 'example',
        title: 'Example',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/example'
    }
];



//-----------------
export const defaultNavigation: FuseNavigationItem[] = [
    {
        id   : 'example',
        title: 'Example',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/example'
    }
];
export const compactNavigation: FuseNavigationItem[] = [
    {
        id   : 'example',
        title: 'Example',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/example'
    }
];
export const futuristicNavigation: FuseNavigationItem[] = [
    {
        id   : 'example',
        title: 'Example',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/example'
    }
];
export const horizontalNavigation: FuseNavigationItem[] = [
    {
        id   : 'example',
        title: 'Example',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/example'
    }
];