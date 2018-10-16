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
  private activities: Activity[] = [];

  constructor(
    private activityService: ActivityService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.activityService.list().subscribe(
      (activities: any[]) => {
        console.log('eventos', activities[0]);
        this.activities.push(
          new Activity(
            activities[0].name,
            activities[0].description,
            activities[0].beginning_date,
            activities[0].minimum_quorum,
            activities[0].maximum_capacity,
            activities[0].schedule_id,
            activities[0].event_id,
            activities[0].location_id,
            activities[0].room_id
          )
        );
      },
      err => {
        const msg: string = 'Erro obtendo atividades.';
        this.snackBar.open(msg, 'Erro', { duration: 5000 });
      }
    );
    console.log(this.activities);
  }
}
