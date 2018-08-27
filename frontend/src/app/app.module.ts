import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {RouterModule} from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { CanActivateDashboardGuard } from './can-activate-dashboard.gaurd';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([{
      path: 'dashboard',
      component:DashboardComponent,
      canActivate: [CanActivateDashboardGuard]
    }]),
    RouterModule.forRoot([{
      path: 'login',
      component:LoginComponent
    }]),
    RouterModule.forRoot([{
      path: 'register',
      component:RegisterComponent
    }]),
    RouterModule.forRoot([{
      path: '',
      component:HomeComponent
    }])
  ],
  providers: [CanActivateDashboardGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
