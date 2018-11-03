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
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
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
    this._id = this.route.url.replace('/', '');
    let id_splited = this._id.split('/');
    this._id = id_splited[2];
    this.find(this._id);
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
}
