import { Component, OnInit, ViewChild } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { EventService } from '../../services/event.service';
import { Event } from '../../models/event.model';
import {
  HttpClientModule,
  HttpClient,
  HTTP_INTERCEPTORS,
  HttpEventType
} from '@angular/common/http';

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
  colunas: string[] = [
    'name',
    'description',
    'beginning_date',
    'end_date',
    'id'
  ];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  private events: Event[] = [];
  private details: any[] = [];

  constructor(
    private eventService: EventService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.list();
    //criar um subscribe do método que eu criei event emmiter no service, dar um push no array events
  }

  list() {
    {
      this.eventService.list().subscribe(
        data => {
          this.events = data as Event[];
          this.dataSource = new MatTableDataSource<Event>(this.events);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          console.log(this.events);
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
        this.eventService
          .save(result.event, result.arquivo)
          .subscribe((event: any) => {
            if (event.type == HttpEventType.Response) {
              const e = event.body;
              const createdEvent = {
                name: e.name,
                description: e.description,
                beginning_date: e.beginning_date,
                end_date: e.end_date
                //e.photo
              };
              console.log('LISTA DE EVENTOS', this.events);
              console.log('NOVO EVENTO', createdEvent);
              this.events.push(createdEvent);
              console.log('ROTA', this.events);
              this.list();
            }
          });
        const msg: string = 'Evento cadastrado com sucesso.';
        this.snackBar.open(msg, 'Sucesso', { duration: 5000 });
      }
    });
  }

  delete(id) {
    console.log('DELEÇÃO DO EVENTO', id);
    this.eventService.delete(id).subscribe((event: any) => {
      console.log('EVENTO TYPE', event);
      console.log('ATUALIZADO', this.events);
      const e = event;
      const deletedEvent = {
        id: e.id,
        name: e.name,
        description: e.description,
        beginning_date: e.beginning_date,
        end_date: e.end_date
        //e.photo
      };
      console.log('LISTA DE EVENTOS', this.events);
      console.log('DELETADO EVENTO', deletedEvent);

      this.events = this.events.filter(item => {
        console.log('TRUE OR FALSE ?', item.id != deletedEvent.id);
        return item.id != deletedEvent.id;
      });
      this.list();
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
