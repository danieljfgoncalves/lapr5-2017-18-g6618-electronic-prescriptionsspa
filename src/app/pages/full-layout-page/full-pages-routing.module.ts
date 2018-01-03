import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FullLayoutPageComponent } from 'app/pages/full-layout-page/example/full-layout-page.component';
import { PresentationsComponent } from 'app/pages/full-layout-page/presentations/presentations.component';
import { ChangeLogComponent } from 'app/changelog/changelog.component';
import { PresentationDetailComponent } from 'app/pages/full-layout-page/presentation-detail/presentation-detail.component';
import { MedicalReceiptConsultPageComponent } from 'app/pages/full-layout-page/receipts-consult-page/receipts-consult-page.component';
import { AuthGuard } from 'app/shared/auth/auth-guard.service';
import { PatientAuthGuard } from 'app/shared/auth/patient-auth-guard.service';
import { PharmacistAuthGuard } from 'app/shared/auth/pharmacist-auth-guard.service';
import { PhyscianAuthGuard } from 'app/shared/auth/physician-auth-guard.service';
import { Role } from 'app/model/role';
import { CheckRoleGuard } from 'app/shared/auth/check-role-guard.service';
import { FillsComponent } from 'app/shared/fills/fills.component';
import { MedicalReceiptCreatePageComponent } from 'app/pages/full-layout-page/receipts-create-page/receipts-create-page.component';
import { MedicalReceiptUpdatePageComponent } from 'app/pages/full-layout-page/receipts-update-page/receipts-update-page.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'dashboard',
        component: ChangeLogComponent,
        data: {
          title: 'Dashboard Page'
        }
      },
      {
        path: 'example',
        component: FullLayoutPageComponent,
        data: {
          title: 'Example Page'
        }
      },
      {
        path: 'presentations',
        component: PresentationsComponent,
        data: {
          title: 'Presentations Page'
        }
      },
      {
        path: 'presentations/:id',
        component: PresentationDetailComponent,
        data: {
          title: 'Presentation Details Page'
        }
      },
      {
        path: 'receipts-consult',
        component: MedicalReceiptConsultPageComponent,
        data: {
          title: 'Consult Receipts Page',
          allowedRoles: [Role.PHYSICIAN, Role.PATIENT]
        },
        canActivate: [AuthGuard, CheckRoleGuard],
      },
      {
        path: 'fills',
        component: FillsComponent,
        data: {
          title: 'Presentation Details Page'
        }
      },
      {
        path: 'receipts-create',
        component: MedicalReceiptCreatePageComponent,
        data: {
          title: 'Create Receipt Page',
          allowedRoles: [Role.PHYSICIAN]
        },
        canActivate: [AuthGuard, CheckRoleGuard],
      },
      {
        path: 'receipts-update',
        component: MedicalReceiptUpdatePageComponent,
        data: {
          title: 'Update Receipt Page',
          allowedRoles: [Role.PHYSICIAN]
        },
        canActivate: [AuthGuard, CheckRoleGuard],
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FullPagesRoutingModule { }
