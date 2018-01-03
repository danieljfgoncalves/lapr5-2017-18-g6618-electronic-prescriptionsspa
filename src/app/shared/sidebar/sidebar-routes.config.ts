import { RouteInfo } from './sidebar.metadata';
import { Role } from 'app/model/role';

export const ROUTES: RouteInfo[] = [

    {
        path: '/main/dashboard', title: 'Dashboard', icon: 'ft-layout', class: '', badge: '', badgeClass: '', isExternalLink: false, allowedRoles: [], submenu: []
    },
    {
        path: '', title: 'Receipts', icon: 'ft-clipboard', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false, allowedRoles: [],
        submenu: [
            { path: '/main/receipts-consult', title: 'Consult', icon: 'ft-search', class: '', badge: '', badgeClass: '', isExternalLink: false, allowedRoles: [Role.PATIENT, Role.PHYSICIAN], submenu: [] },
            { path: '/main/receipts-create', title: 'Create', icon: 'ft-file-plus', class: '', badge: '', badgeClass: '', isExternalLink: false, allowedRoles: [Role.PHYSICIAN], submenu: [] },
            { path: '/main/receipts-update', title: 'Edit', icon: 'ft-edit', class: '', badge: '', badgeClass: '', isExternalLink: false, allowedRoles: [Role.PHYSICIAN], submenu: [] },
            { path: '/main/fills', title: 'Fills', icon: 'ft-check-square', class: '', badge: '', badgeClass: '', isExternalLink: false, allowedRoles: [Role.PHARMACIST], submenu: [] }

        ]
    },
    {
        path: '', title: 'Medicines', icon: 'fa fa-medkit', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false, allowedRoles: [],
        submenu: [
            { path: '/main/presentations', title: 'Presentations', icon: 'ft-search', class: '', badge: '', badgeClass: '', isExternalLink: false, allowedRoles: [], submenu: [] }
        ]
    }
];
