import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
//Formulário reativo
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RegisterComponent } from './components/register/register.component';
import { RegistryComponent } from './components/registry.component';

//Angular Material
import {
  MatInputModule,
  MatButtonModule,
  MatListModule,
  MatTooltipModule,
  MatIconModule,
  MatSnackBarModule,
  MatCardModule,
  MatToolbarModule,
  MatSelectModule
} from '@angular/material';

//import { SharedModule } from '../../shared/shared.module';

import { FlexLayoutModule } from '@angular/flex-layout';

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
    //SharedModule,
    MatSelectModule
  ],
  declarations: [RegisterComponent, RegistryComponent]
  /*providers: [
        RegisterService
    ]*/
})
@NgModule({
  imports: [CommonModule],
  declarations: [RegisterComponent]
})
export class RegistryModule {}
