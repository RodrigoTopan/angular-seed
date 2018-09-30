import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './components/list/list.component';
import { CreateComponent } from './components/create/create.component';

@NgModule({
  imports: [CommonModule],
  declarations: [ListComponent, CreateComponent]
})
export class EventsModule {}
