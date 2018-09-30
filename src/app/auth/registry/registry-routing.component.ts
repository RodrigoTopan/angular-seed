import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistryComponent } from './components/registry.component';
import { RegisterComponent } from './components/register/register.component';


export const RegistryRoutes: Routes = [
    {
        path: 'register',
        component: RegistryComponent,
        children: [
            {
                path: '',
                component: RegisterComponent
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(RegistryRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class RegistryRoutingModule { }