
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from "./shared/shared.module";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

// Components
import { AppComponent } from './app.component';
import { FullLayoutComponent } from "./layouts/full/full-layout.component";
import { ContentLayoutComponent } from 'app/layouts/content/content-layout.component';

// Services
import { AuthService } from './shared/auth/auth.service';
import { AuthGuard } from './shared/auth/auth-guard.service';
import { PresentationService } from './presentation.service';
import { MedicalReceiptService } from './shared/medical-receipts/medical-receipt.service'
import { UserService } from 'app/shared/user.service';
import { CheckRoleGuard } from 'app/shared/auth/check-role-guard.service';


import * as $ from 'jquery';
import { PrescriptionService } from 'app/shared/prescription.service';


@NgModule({
    declarations: [
        AppComponent,
        FullLayoutComponent,
        ContentLayoutComponent
    ],
    imports: [
        BrowserAnimationsModule,
        AppRoutingModule,
        SharedModule,
        HttpClientModule,
        NgbModule.forRoot(),
        ReactiveFormsModule
    ],
    providers: [
        AuthService,
        AuthGuard,
        CheckRoleGuard,
        PresentationService,
        MedicalReceiptService,
        UserService,
        PrescriptionService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }