import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { CreateComponent } from './components/create/create.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserComponent } from './components/user.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { UserService } from './services/user.service';

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
    MatDatepickerModule
  ],
  declarations: [UserComponent],
  providers: [UserService]
})
export class UsersModule {}
