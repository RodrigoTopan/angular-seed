import { Component, OnInit, ViewChild } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { EventService } from '../../services/event.service';
import { Event } from '../../models/event.model';
import { EventDialogComponent } from '../event-dialog/event-dialog.component';
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

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  dataSource: MatTableDataSource<Event>;
  colunas: string[] = ['name', 'description', 'beginning_date', 'end_date'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  private events: Event[] = [];

  constructor(
    private eventService: EventService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.list();
  }

  list() {
    {
      this.eventService.list().subscribe(
        data => {
          const events = data as Event[];
          this.dataSource = new MatTableDataSource<Event>(events);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          console.log(events);
        },
        err => {
          const msg: string = 'Erro obtendo eventos.';
          this.snackBar.open(msg, 'Erro', { duration: 5000 });
        }
      );
      console.log(this.events);
    }
  }
  openDialog() {
    const dialogRef = this.dialog.open(EventDialogComponent, {
      width: '600px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('CADASTRO EVENTO', result);
        this.eventService.save(result.event, result.arquivo);
        this.events = [];
        this.list();
      }
    });
  }
}
