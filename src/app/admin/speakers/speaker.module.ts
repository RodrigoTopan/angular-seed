import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './components/list/list.component';
import { EditComponent } from './components/edit/edit.component';
//import { CreateComponent } from './components/create/create.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EnterComponent } from './components/enter.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AdminComponentsModule } from '../commons/adminComponents.module';
import { SpeakerService } from './services/speaker.service';
import {
  HttpClientModule,
  HttpClient,
  HTTP_INTERCEPTORS,
  HttpEventType
} from '@angular/common/http';

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
  MatToolbarModule,
  MatSelectModule,
  MatPaginatorModule,
  MatDatepickerModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatSelectModule,
    MatTooltipModule,
    MatIconModule,
    MatSnackBarModule,
    FlexLayoutModule,
    MatCardModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatDatepickerModule,
    AdminComponentsModule
  ],
  declarations: [ListComponent, EditComponent, EnterComponent],
  providers: [SpeakerService]
})
export class SpeakersModule {}