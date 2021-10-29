import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanActivateGuardService } from './can-activate-guard.service';
import { ClientComponent } from './client/client.component';
import { EmployeeComponent } from './employee/employee.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';

const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"home",component:HomeComponent},
  {path:"employee",component: EmployeeComponent,canActivate:[CanActivateGuardService] },
  {path:"client",component:ClientComponent,canActivate:[CanActivateGuardService]},
  {path:"signup",component: SignUpComponent},
  {path:"login",component:LoginComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
