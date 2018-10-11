import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './components/list/list.component';
//import { CreateComponent } from './components/create/create.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EnterComponent } from './components/enter.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AdminComponentsModule } from '../commons/adminComponents.module';
import { EventService } from './services/event.service';

//Angular Material
import {
  MatInputModule,
  MatButtonModule,
  MatListModule,
  MatTooltipModule,
  MatIconModule,
  MatSnackBarModule,
  MatCardModule,
  MatTableModule,
  MatToolbarModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatTooltipModule,
    MatIconModule,
    MatSnackBarModule,
    FlexLayoutModule,
    MatCardModule,
    MatToolbarModule,
    AdminComponentsModule
  ],
  declarations: [ListComponent, EnterComponent],
  providers: [EventService]
})
export class EventsModule {}
