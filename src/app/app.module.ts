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
import { RegistryRoutingModule } from './auth/registry/registry-routing.component';

//Pacote do Administrador
import { AdminModule } from './admin/admin.module';
import { AdminRoutingModule } from './admin/admin-routing.module';

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
    AdminModule,
    AdminRoutingModule,
    AppRoutingModule //It must be the last imported module
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
