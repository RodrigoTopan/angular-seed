import { Component, OnInit, ViewChild } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { ActivityService } from '../../services/activity.service';
import { Activity } from '../../models/activity.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ActivityDialogComponent } from '../activity-dialog/activity-dialog.component';

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
    'description',
    'beginning_date',
    'minimum_quorum',
    'maximum_capacity',
    'schedule',
    'event',
    'location',
    'room',
    'end_date',
    'id'
  ];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  private activities: any[] = [];
  private activity: Activity;
  private id: string;

  constructor(
    private route: Router,
    private activityService: ActivityService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    let id = this.route.url;
    id = this.route.url.replace('/actvities', '');
    let id_splited = id.split('/');
    this.id = id_splited[3];
    this.list();
  }

  list() {
    console.log('id', this.id);
    this.activityService.list(this.id).subscribe(
      data => {
        const activities = data.activities;
        this.activities = activities as any[];
        console.log('ACTIVITIES');
        this.dataSource = new MatTableDataSource<any>(this.activities);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        console.log(this.activities);
      },
      err => {
        const msg: string = 'Erro obtendo atividades.';
        this.snackBar.open(msg, 'Erro', { duration: 5000 });
      }
    );
    console.log(this.activities);
  }

  openDialog(activity_id) {
    const dialogRef = this.dialog.open(ActivityDialogComponent, {
      width: '800px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const session = JSON.parse(localStorage.getItem('user'));
        console.log('USUÁRIO COM SESSÃO ', session.user.id);
        const subscription = {
          user_id: session.user.id,
          activity_id: activity_id,
          event_id: this.id
        };
        console.log('INSCRIÇÃO EM UMA ATIVIDADE', subscription);
        this.activityService
          .save(subscription, result.arquivo)
          .subscribe((activity: any) => {
            if (activity.type == HttpEventType.Response) {
              const a = activity.body;
              const createdSubscription = {
                user_id: a.user_id,
                activity_id: a.activity_id,
                event_id: a.event_id
              };
              console.log('NOVA INSCRIÇÃO', createdSubscription);
              const msg: string = 'Inscrição realizada com sucesso.';
              this.snackBar.open(msg, 'Sucesso', { duration: 5000 });
              //this.activities.push(createdSubscription);
            }
          });
      } else {
        const msg: string = 'Atividade com capacidade máxima atingida ou tipo de público não correspondente.';
        this.snackBar.open(msg, 'Sucesso', { duration: 10000 });
      }
    });
  }
}
