import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { RegistryComponent } from './auth/registry/components/registry.component';
import { EnterComponent as AdminEnterComponent } from './admin/dashboard/components/enter.component';
import { ListComponent as AdminEventListComponent } from './admin/events/components/list/list.component';
import { DashboardComponent } from './admin/dashboard/components/dashboard.component';
/**
 * Quando a minha aplicação receber uma chamada na index, 
 * redirecionar para a minha porta de login
 */
export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login1',
    pathMatch: 'full'
  },
  {
    path: 'register1',
    component: RegistryComponent
  },
  {
    path: 'admin1',
    component: AdminEnterComponent,
    children: [
      {
        path: 'dashboard1',
        component: DashboardComponent
      },
      {
        path: 'events1',
        component: AdminEventListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
