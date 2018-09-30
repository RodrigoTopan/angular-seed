import { NgModule } from '@angular/core';
import { LoginComponent } from './components/login/login.component';
import { EnterComponent } from './components/enter.component';
import { RouterModule, Routes } from '@angular/router';

export const LoginRoutes: Routes = [
  {
    path: 'login',
    component: EnterComponent,
    children: [{ path: '', component: LoginComponent }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(LoginRoutes)],
  exports: [RouterModule]
})
export class LoginRoutingModule {}
