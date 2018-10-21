import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatDialogModule,
  MatDialog,
  MatInputModule,
  MatSelectModule,
  MatIconModule,
  MatDividerModule,
  MatChipsModule,
  MatToolbarModule,
  MatBadgeModule,
  MatDatepickerModule,
  MatTableModule,
  MatPaginatorModule,
  MatNativeDateModule
} from '@angular/material';
import { LoginModule } from './auth/login/login.module';
import { LoginRoutingModule } from './auth/login/login-routing.module';
import { AppRoutingModule } from './app.routing';

import { AppComponent } from './app.component';
//import { RegistryComponent } from './auth/registry/components/registry.component';
import { RegistryModule } from './auth/registry/registry.module';
//Pacote do Administrador
import { EventsModule as AdminEventModule } from './admin/events/event.module';
import { ActivitiesModule as AdminActivityModule } from './admin/activities/activity.module';
//Dashboard
import { DashboardModule } from './admin/dashboard/dashboard.module';
import { MaskDirective } from './shared/directive/mask.directive';
//Pacote do Público
import { EventDialogComponent as AdminEventDialogComponent } from './admin/events/components/event-dialog/event-dialog.component';

import { InterceptorModule } from '../app/auth/login/interceptor.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent, AdminEventDialogComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    MatDividerModule,
    MatDialogModule,
    MatChipsModule,
    MatBadgeModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatPaginatorModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    LoginModule,
    LoginRoutingModule,
    RegistryModule,
    AdminEventModule,
    InterceptorModule,
    AdminActivityModule,
    DashboardModule,
    AppRoutingModule //It must be the last imported module
  ],
  providers: [],
  entryComponents: [AdminEventDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
