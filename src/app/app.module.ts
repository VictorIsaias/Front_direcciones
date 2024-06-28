import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { MatNativeDateModule } from '@angular/material/core';
import { ApiService } from './services/api.service';
import { HttpClientModule,HttpClientJsonpModule } from '@angular/common/http';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddAddressComponent } from './components/add-address/add-address.component';
import { FindAddressesComponent } from './components/find-addresses/find-addresses.component';
import { AllAddressesComponent } from './components/all-addresses/all-addresses.component';
import {CookieService} from 'ngx-cookie-service';
import { GoogleMapsModule } from '@angular/google-maps';
import { LocationService } from './services/location.service';
import { RECAPTCHA_V3_SITE_KEY, RecaptchaModule, RecaptchaV3Module } from "ng-recaptcha";
@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    RegisterFormComponent,
    LoginFormComponent,
    DashboardComponent,
    AddAddressComponent,
    FindAddressesComponent,
    AllAddressesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatGridListModule,
    MatMenuModule,
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule,
    HttpClientJsonpModule,
    HttpClientModule,
    GoogleMapsModule,
    RecaptchaV3Module
  ],
  providers: [ApiService,CookieService,LocationService,{ provide: RECAPTCHA_V3_SITE_KEY, useValue: "6LeLLeUpAAAAAB44r4cpqPMd5bJ7cENYS4uzTZjn" }],
  bootstrap: [AppComponent],
  schemas: []
})
export class AppModule { }
