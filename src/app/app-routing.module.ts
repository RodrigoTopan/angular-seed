import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';

/**
 * Quando a minha aplicação receber uma chamada na index, 
 * redirecionar para a minha porta de login
 */
export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
