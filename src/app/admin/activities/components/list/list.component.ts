import { Component, OnInit, ViewChild } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { ActivityService } from '../../services/activity.service';
import { Activity } from '../../models/activity.model';

import {
  MatTableDataSource,
  MatSnackBar,
  PageEvent,
  MatPaginator,
  Sort,
  MatSort
} from '@angular/material';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  dataSource: MatTableDataSource<Activity>;

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

  private activities: Activity[] = [];

  constructor(
    private activityService: ActivityService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    /*this.activities.push(
      new Activity(
        'Teste atividade',
        'teste descrição',
        '2018-01-01',
        '10',
        '50',
        '1',
        '1',
        '1',
        '1'
      )
    );*/
    this.activityService.list().subscribe(
      data => {
        this.activities = data as Activity[];
        console.log('ACTIVITIESSSSSSSS');
        this.dataSource = new MatTableDataSource<Activity>(this.activities);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        console.log(this.activities);
      },
      err => {
        const msg: string = 'Erro obtendo eventos.';
        this.snackBar.open(msg, 'Erro', { duration: 5000 });
      }
    );
    console.log(this.activities);
  }
}
