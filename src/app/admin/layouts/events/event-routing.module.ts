import { NgModule } from '@angular/core';
import { ListComponent } from './components/list/list.component';
import { CreateComponent } from './components/create/create.component';
import { EnterComponent } from './components/enter.component';
import { RouterModule, Routes } from '@angular/router';

export const EventRoutes: Routes = [
  {
    path: 'events',
    component: EnterComponent,
    children: [
      { path: 'list', component: ListComponent },
      { path: 'create', component: CreateComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(EventRoutes)],
  exports: [RouterModule]
})
export class EventRoutingModule {}
