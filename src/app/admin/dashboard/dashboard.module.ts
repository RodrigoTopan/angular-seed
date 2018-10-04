import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard.component';
//import { CreateComponent } from './components/create/create.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EnterComponent } from './components/enter.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AdminComponentsModule } from '../commons/adminComponents.module';

//Angular Material
import {
  MatInputModule,
  MatButtonModule,
  MatListModule,
  MatTooltipModule,
  MatIconModule,
  MatSnackBarModule,
  MatCardModule,
  MatToolbarModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
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
  declarations: [DashboardComponent, EnterComponent]
})
export class DashboardModule {}
