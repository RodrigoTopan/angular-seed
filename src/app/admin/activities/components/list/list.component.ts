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
  ) {}

  ngOnInit() {
    let id = this.route.url;
    id = this.route.url.replace('/actvities', '');
    let id_splited = id.split('/');
    this.id = id_splited[3];
    this.list();
  }

  list() {
    console.log('idddddddddddd', this.id);
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

  openDialog() {
    const dialogRef = this.dialog.open(ActivityDialogComponent, {
      width: '800px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('CADASTRO DE UMA ATIVIDADE', result.activity);
        this.activityService
          .save(result.activity, result.arquivo)
          .subscribe((activity: any) => {
            if (activity.type == HttpEventType.Response) {
              const a = activity.body;
              const createdActivity = {
                name: a.name,
                description: a.description,
                beginning_date: a.beginning_date,
                minimum_quorum: a.minimum_quorum,
                maximum_capacity: a.maximum_capacity,
                schedule_id: a.schedule_id,
                event_id: a.event_id,
                location_id: a.location_id,
                room_id: a.room_id
              };
              console.log('Lista de atividades', this.activities);
              console.log('NOVA ATIVIDADE', createdActivity);
              this.activities.push(createdActivity);
              console.log('ROTA', this.activities);
              this.list();
            }
          });
      }
    });
  }
}
