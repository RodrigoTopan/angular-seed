import { Component, OnInit, ViewChild } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { LocationService } from '../../services/location.service';
import { Location } from '../../models/location.model';
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
export const ROUTES: RouteInfo[] = [{ path: '../locations' }];

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  form: FormGroup;
  private location: Location;
  private _id: string;

  private data = {
    location: Location,
    arquivo: null
  };

  constructor(
    private route: Router,
    private locationService: LocationService,
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
    this.locationService.find(id).subscribe(
      data => {
        this.location = data as Location;
        console.log(this.location);
      },
      err => {
        const msg: string = 'Erro obtendo locais.';
        this.snackBar.open(msg, 'Erro', { duration: 5000 });
      }
    );
    console.log(this.location);
  }

  edit() {
    {
      this.locationService.edit(this.location).subscribe(
        data => {
          const msg: string = 'Local editado com sucesso.';
          this.snackBar.open(msg, 'Sucesso', { duration: 5000 });
        },
        err => {
          const msg: string = 'Erro obtendo locations.';
          this.snackBar.open(msg, 'Erro', { duration: 5000 });
        }
      );
    }
  }
}
