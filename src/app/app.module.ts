import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule } from '@angular/material';

import { LoginModule } from './auth/login/login.module';
import { LoginRoutingModule } from './auth/login/login-routing.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
//import { RegistryComponent } from './auth/registry/components/registry.component';
import { RegistryModule } from './auth/registry/registry.module';
import { RegistryRoutingModule } from './auth/registry/registry-routing.module';

//Pacote do Administrador
import { EventsModule as AdminEventModule } from './admin/events/event.module';
import { EventRoutingModule as AdminEventRoutingModule } from './admin/events/event-routing.module';

//Dashboard
import { DashboardModule } from './admin/dashboard/dashboard.module';
import { DashboardRoutingModule } from './admin/dashboard/dashboard-routing.module';

//Pacote do Público

@NgModule({
  declarations: [
    AppComponent
    //RegistryComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    LoginModule,
    LoginRoutingModule,
    RegistryModule,
    RegistryRoutingModule,
    AdminEventModule,
    AdminEventRoutingModule,
    //AdminEventModule,
    DashboardModule,
    DashboardRoutingModule,
    AppRoutingModule //It must be the last imported module
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
