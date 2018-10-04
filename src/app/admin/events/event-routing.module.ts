import { NgModule } from '@angular/core';
import { ListComponent } from './components/list/list.component';
import { EnterComponent } from './components/enter.component';
import { RouterModule, Routes } from '@angular/router';

export const EventRoutes: Routes = [
  {
    path: 'admin/events',
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
  imports: [RouterModule.forChild(EventRoutes)],
  exports: [RouterModule]
})
export class EventRoutingModule {}
