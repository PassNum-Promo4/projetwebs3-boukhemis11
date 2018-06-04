import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './home/login.component';
import { AboutComponent } from './home/about.component';
import { RegisterComponent } from './user/register.component';
import { ProfileComponent } from './user/profile.component';
import { PasswordComponent } from './user/password.component';
import { LogoutComponent } from './user/logout.component';
import { AuthGuardService  } from './user/auth-guard.service';
import { AuthService } from './user/auth.service';
import { UserService } from './user/user.service';
import { ReportComponent } from './voiture/report.component';
import { VoitureComponent } from './voiture/voiture.component';
import { ViewvoitureComponent } from './voiture/viewvoiture.component';


import { VoitureService } from './voiture/voiture.service';
import { MDBBootstrapModule } from 'angular-bootstrap-md';


const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'about', component: AboutComponent},

  { path: 'register', component: RegisterComponent },
  { path: 'profile', canActivate: [ AuthGuardService ], component: ProfileComponent },
  { path: 'password', canActivate: [ AuthGuardService ], component: PasswordComponent },
  { path: 'logout', canActivate: [ AuthGuardService ], component: LogoutComponent },
  { path: 'report', canActivate: [ AuthGuardService], component: ReportComponent },
  { path: 'voiture', canActivate: [ AuthGuardService], component: VoitureComponent },
  { path: 'voiture/:id', canActivate: [ AuthGuardService], component: VoitureComponent },
  { path: 'voiture/view/:id', canActivate: [ AuthGuardService], component: ViewvoitureComponent },
  { path: '', redirectTo: 'about', pathMatch: 'full' },
  { path: '**', redirectTo: 'about', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [ RouterModule ],
  declarations: []
})
export class AppRoutingModule { }
