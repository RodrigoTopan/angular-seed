import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  private user: User;

  constructor(
    private route: Router,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    const info = JSON.parse(localStorage.getItem('user'));
    this.getUserDetails();
  }

  getUserDetails() {
    this.userService.getUserDetails().subscribe(
      data => {
        this.user = data as User;
        console.log(this.user);
      },
      err => {
        const msg: string = 'Erro obtendo as informações do usuário';
        this.snackBar.open(msg, 'Erro', { duration: 5000 });
      }
    );
    console.log(this.user);
  }
}
