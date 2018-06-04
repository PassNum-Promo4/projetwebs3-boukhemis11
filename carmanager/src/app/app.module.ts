import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { DatePipe } from '@angular/common';



import 'rxjs';

import { AppComponent } from './app.component';
import { LoginComponent } from './home/login.component';
import { AboutComponent } from './home/about.component';
import { RegisterComponent } from './user/register.component';
import { ProfileComponent } from './user/profile.component';
import { PasswordComponent } from './user/password.component';
import { LogoutComponent } from './user/logout.component';


import { UserService } from './user/user.service';


import { ToastrService } from './common/toastr.service';

import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AppRoutingModule } from './app-routing.module';
import { ReportComponent } from './voiture/report.component';
import { VoitureComponent } from './voiture/voiture.component';
import { ViewvoitureComponent } from './voiture/viewvoiture.component';
import { AuthGuardService } from './user/auth-guard.service';
import { AuthService } from './user/auth.service';
import { VoitureService } from './voiture/voiture.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AboutComponent,
    ReportComponent,
    VoitureComponent,
    ViewvoitureComponent,
    RegisterComponent,
    ProfileComponent,
    PasswordComponent,
    LogoutComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    MDBBootstrapModule.forRoot(),
    AppRoutingModule,

  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [ToastrService,
    AuthService,
    AuthGuardService,
    UserService,
    DatePipe,
    AuthService,
    AuthGuardService,
    VoitureService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
