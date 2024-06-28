import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddAddressComponent } from './components/add-address/add-address.component';
import { AllAddressesComponent } from './components/all-addresses/all-addresses.component';
import { FindAddressesComponent } from './components/find-addresses/find-addresses.component';
import { AuthGuardGuard } from './guards/auth-guard.guard';
import { AdminGuard } from './guards/admin.guard';

const routes: Routes = [
  {path:"", component:LoginFormComponent,canActivate:[]},
  {path:"register", component:RegisterFormComponent,canActivate:[]},
  {path:"login", component:LoginFormComponent,canActivate:[]},
  {path:"dashboard", component:DashboardComponent,canActivate:[AuthGuardGuard],children:[
    {path:"add-address", component:AddAddressComponent,canActivate:[]},
    {path:"find-addresses", component:FindAddressesComponent,canActivate:[]},
    {path:"all-addresses", component:AllAddressesComponent,canActivate:[AdminGuard]},
  ]},
  {path:"**", component:NotFoundComponent,canActivate:[]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
