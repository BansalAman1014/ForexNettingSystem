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
import { OrderblotterComponent } from './orderblotter/orderblotter.component';
import { TradeblotterComponent } from './tradeblotter/tradeblotter.component';
import { CanActivateLoginGuard } from './can-activate-login.gaurd';
import { CurrencyPairPricesComponent } from './currency-pair-prices/currency-pair-prices.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    HomeComponent,
    OrderblotterComponent,
    TradeblotterComponent,
    CurrencyPairPricesComponent
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
      component:LoginComponent,
      canActivate: [CanActivateLoginGuard]
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
      component:HomeComponent,
      canActivate: [CanActivateLoginGuard]
    }])
  ],
  providers: [
    CanActivateDashboardGuard,
    CanActivateLoginGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
