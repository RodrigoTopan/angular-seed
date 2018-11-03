import { Component, OnInit, ViewChild } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { RoomService } from '../../services/room.service';
import { Room } from '../../models/room.model';
import { HttpEventType } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import {
  MatTableDataSource,
  MatSnackBar,
  MatFormField,
  PageEvent,
  MatPaginator,
  Sort,
  MatSort,
  MatDialog
} from '@angular/material';

interface RouteInfo {
  path: string;
}
export const ROUTES: RouteInfo[] = [{ path: '../rooms' }];

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  form: FormGroup;
  private room: Room;
  private _id: string;

  private data = {
    room: new Room('', '', '', '', '', '', '', ''),
    arquivo: null
  };

  constructor(
    private route: Router,
    private roomService: RoomService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this._id = this.route.url;
    this._id = this.route.url.replace('/edit', '');
    let id_splited = this._id.split('/');
    this._id = id_splited[3];
    this.find(id_splited[3]);
  }

  find(id) {
    this.roomService.find(id).subscribe(
      data => {
        this.room = data as Room;
        console.log(this.room);
      },
      err => {
        const msg: string = 'Erro obtendo salas.';
        this.snackBar.open(msg, 'Erro', { duration: 5000 });
      }
    );
    console.log(this.room);
  }

  edit() {
    {
      this.roomService.edit(this.room).subscribe(
        data => {
          const msg: string = 'Sala editada com sucesso.';
          this.snackBar.open(msg, 'Sucesso', { duration: 5000 });
        },
        err => {
          const msg: string = 'Erro obtendo salas.';
          this.snackBar.open(msg, 'Erro', { duration: 5000 });
        }
      );
    }
  }
}
