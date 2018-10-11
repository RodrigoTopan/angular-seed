import { Component, OnInit, ViewChild } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { EventService } from '../../services/event.service';
import { Event } from '../../models/event.model';
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
  private events: Event[] = [];

  constructor(
    private eventService: EventService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.eventService.list().subscribe(
      (events: any[]) => {
        console.log('eventos', events[0]);
        this.events.push(
          new Event(
            events[0].name,
            events[0].description,
            events[0].beginning_date,
            events[0].end_date
          )
        );
      },
      err => {
        const msg: string = 'Erro obtendo eventos.';
        this.snackBar.open(msg, 'Erro', { duration: 5000 });
      }
    );
    console.log(this.events);
  }
}
