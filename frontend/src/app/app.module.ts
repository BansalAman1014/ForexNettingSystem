import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {RouterModule} from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import 'materialize-css';
import { MaterializeModule } from 'angular2-materialize';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { CanActivateDashboardGuard } from './can-activate-dashboard.gaurd';
import { OrderblotterComponent } from './orderblotter/orderblotter.component';
import { TradeblotterComponent } from './tradeblotter/tradeblotter.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    HomeComponent,
    OrderblotterComponent,
    TradeblotterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterializeModule,
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
      path: 'orderblotter',
      component:OrderblotterComponent
    }]),
    RouterModule.forRoot([{
      path: 'tradeblotter',
      component:TradeblotterComponent
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
