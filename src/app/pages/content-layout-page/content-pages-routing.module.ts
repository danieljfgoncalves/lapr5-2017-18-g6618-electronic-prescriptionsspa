import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContentLayoutPageComponent } from './example/content-layout-page.component'; // FIXME: Remove all content layout page
import { LoginPageComponent } from './login/login-page.component';
import { RegisterPageComponent } from 'app/pages/content-layout-page/register/register-page.component';
import { DeletePageComponent } from 'app/pages/content-layout-page/delete-user/delete-page.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'login',
        component: LoginPageComponent,
        data: {
          title: 'Login Page'
        }
      },
      {
        path: 'example',
        component: ContentLayoutPageComponent,
        data: {
          title: 'Example Page'
        }
      },
      {
        path: 'register',
        component: RegisterPageComponent,
        data: {
          title: 'Register Page'
        }
      },
      {
        path: 'delete',
        component: DeletePageComponent,
        data: {
          title: 'Delete Page'
        }
      },
      // { // FIXME:
      //   path: 'error',
      //   component: ErrorPageComponent,
      //   data: {
      //     title: 'Error Page'
      //   }
      // },
    ]   
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContentPagesRoutingModule { }
