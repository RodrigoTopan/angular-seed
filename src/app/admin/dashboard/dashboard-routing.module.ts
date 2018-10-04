import { NgModule } from '@angular/core';
import { DashboardComponent } from './components/dashboard.component';
import { EnterComponent } from './components/enter.component';
import { RouterModule, Routes } from '@angular/router';

export const EventRoutes: Routes = [
  {
    path: 'admin/dashboard',
    component: EnterComponent,
    children: [
      {
        path: '',
        component: DashboardComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(EventRoutes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
