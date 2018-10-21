import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { RegisterComponent } from './auth/registry/components/register/register.component';
import { EnterComponent as AdminEnterComponent } from './admin/dashboard/components/enter.component';
import { ListComponent as AdminEventListComponent } from './admin/events/components/list/list.component';
import { EditComponent as AdminEditEventComponent } from './admin/events/components/edit/edit.component';
import { DashboardComponent } from './admin/dashboard/components/dashboard.component';
import { ListComponent as AdminActivityListComponent } from './admin/activities/components/list/list.component';
/**
 * Quando a minha aplicação receber uma chamada na index, 
 * redirecionar para a minha porta de login
 */
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'admin',
    component: AdminEnterComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'events',
        component: AdminEventListComponent
      },
      {
        path: 'events/edit/:id',
        component: AdminEditEventComponent //Vai receber no constructor
      },
      {
        path: 'activities/:id',
        component: AdminActivityListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
