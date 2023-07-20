import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TransactionComponent } from './transaction/transaction.component';
import { authguardGuard } from './guards/authguard.guard';

const routes: Routes = [
  {
    path:"",component:LandingpageComponent
  },
  {
    path:"user/login",component:LoginComponent
  },
  {
    path:"user/register",component:RegisterComponent
  },
  {
    path:"user/dashboard",component:DashboardComponent,canActivate:[authguardGuard]
  },
  {
    path:"user/transaction",component:TransactionComponent,canActivate:[authguardGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
