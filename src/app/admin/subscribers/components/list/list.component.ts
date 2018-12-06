import { Component, OnInit, ViewChild } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { SubscriberService } from '../../services/subscriber.service';
import { Router, ActivatedRoute } from '@angular/router';

import {
  MatTableDataSource,
  MatSnackBar,
  PageEvent,
  MatPaginator,
  Sort,
  MatSort,
  MatDialog
} from '@angular/material';
import { Observable } from 'rxjs';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  dataSource: MatTableDataSource<any>;

  colunas: string[] = [
    'name',
    'email',
    'cpf',
    'id'
  ];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  private subscribers: any[] = [];
  private id: string;

  constructor(
    private route: Router,
    private subscriberService: SubscriberService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    let id = this.route.url;
    id = this.route.url.replace('/subscribers', '');
    let id_splited = id.split('/');
    console.log('id', id_splited);
    this.id = id_splited[2];
    this.list();
  }

  list() {
    console.log('idddddddddddd', this.id);
    this.subscriberService.list(this.id).subscribe(
      data => {
        const subscribers = data.users;
        this.subscribers = subscribers as any[];
        console.log('SUBSCRIBERS', subscribers);
        this.dataSource = new MatTableDataSource<any>(this.subscribers);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        console.log(this.subscribers);
      },
      err => {
        const msg: string = 'Erro obtendo inscrições da atividade.';
        this.snackBar.open(msg, 'Erro', { duration: 5000 });
      }
    );
    console.log(this.subscribers);
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  update(subscription_id, check_in) {
    if (check_in == 1 && confirm('Você confirma essa presença?')) {
      const params = {
        check_in: 1
      }
      this.subscriberService.update(subscription_id, params).subscribe(
        data => {
          const msg: string = 'Sucesso em realizar check in.';
          this.snackBar.open(msg, 'Successo', { duration: 5000 });
          this.subscribers = null;
          this.dataSource = null;
          this.list();
        },
        err => {
          const msg: string = 'Erro ao realizar check in do usuário.';
          this.snackBar.open(msg, 'Erro', { duration: 5000 });
        }
      )
    }
    else if (check_in == 0 && confirm('Você confirma o cancelamento da presença?')) {
      const params = {
        check_in: 0
      }
      this.subscriberService.update(subscription_id, params).subscribe(
        data => {
          const msg: string = 'Sucesso em realizar cancelamento.';
          this.snackBar.open(msg, 'Successo', { duration: 5000 });
          this.subscribers = null;
          this.dataSource = null;
          this.list();
        },
        err => {
          const msg: string = 'Erro ao realizar cancelamento do check in.';
          this.snackBar.open(msg, 'Erro', { duration: 5000 });
        }
      )
    }
  }

  getAttendanceList() {
    window.open("http://localhost:8000/subscriptions/"+this.id,'_blank');
    /*this.subscriberService.getAttendanceList(this.id).subscribe(
      data => {
        const msg: string = 'Sucesso em realizar download da lista de presença.';
        this.snackBar.open(msg, 'Successo', { duration: 5000 });
        this.subscribers = null;
        this.dataSource = null;
        this.list();
      }, err => {
        const msg: string = 'Erro ao realizar download da lista de presença.';
        this.snackBar.open(msg, 'Erro', { duration: 5000 });
      })*/
  }
}
