import { Component, OnInit, ViewChild } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { EventService } from '../../services/event.service';
import { Event } from '../../models/event.model';
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
export const ROUTES: RouteInfo[] = [{ path: '../events' }];

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  form: FormGroup;
  private event: Event;
  private _id: string;

  private data = {
    event: new Event('', '', '', ''),
    arquivo: null
  };

  constructor(
    private route: Router,
    private eventService: EventService,
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
    this.eventService.find(id).subscribe(
      data => {
        this.event = data as Event;
        console.log(this.event);
      },
      err => {
        const msg: string = 'Erro obtendo eventos.';
        this.snackBar.open(msg, 'Erro', { duration: 5000 });
      }
    );
    console.log(this.event);
  }

  edit() {
    {
      this.eventService.edit(this.event).subscribe(
        data => {
          const msg: string = 'Evento editado com sucesso.';
          this.snackBar.open(msg, 'Sucesso', { duration: 5000 });
        },
        err => {
          const msg: string = 'Erro obtendo eventos.';
          this.snackBar.open(msg, 'Erro', { duration: 5000 });
        }
      );
    }
  }
}
