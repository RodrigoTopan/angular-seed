import { NgModule } from '@angular/core';

//import { DashboardComponent } from './layouts/dashboard/components/dashboard.component';
import { EnterComponent } from './layouts/events/components/enter.component';
import { ListComponent } from './layouts/events/components/list/list.component';

//import { EnterComponent } from './layouts/enter.component';
import { RouterModule, Routes } from '@angular/router';

export const AdminRoutes: Routes = [
  {
    path: 'admin',
    component: EnterComponent,
    children: [
      {
        path: '',
        component: ListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(AdminRoutes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
