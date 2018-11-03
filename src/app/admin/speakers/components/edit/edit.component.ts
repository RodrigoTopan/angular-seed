import { Component, OnInit, ViewChild } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { SpeakerService } from '../../services/speaker.service';
import { Speaker } from '../../models/speaker.model';
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
  private speaker: Speaker;
  private _id: string;

  private data = {
    speaker: new Speaker('', '', '', '', '', '', '', '', ''),
    arquivo: null
  };

  constructor(
    private route: Router,
    private speakerService: SpeakerService,
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
    this.speakerService.find(id).subscribe(
      data => {
        this.speaker = data as Speaker;
        console.log('PALESTRANTE ENCONTRADO', this.speaker);
      },
      err => {
        const msg: string = 'Erro obtendo palestrantes.';
        this.snackBar.open(msg, 'Erro', { duration: 5000 });
      }
    );
    console.log(this.speaker);
  }

  edit() {
    {
      this.speakerService.edit(this.speaker).subscribe(
        data => {
          const msg: string = 'Palestrante editado com sucesso.';
          this.snackBar.open(msg, 'Sucesso', { duration: 5000 });
        },
        err => {
          const msg: string = 'Erro obtendo palestrantes.';
          this.snackBar.open(msg, 'Erro', { duration: 5000 });
        }
      );
    }
  }
}
