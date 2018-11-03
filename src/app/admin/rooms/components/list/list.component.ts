import { Component, OnInit, ViewChild } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { RoomService } from '../../services/room.service';
import { Room } from '../../models/room.model';
import {
  HttpClientModule,
  HttpClient,
  HTTP_INTERCEPTORS,
  HttpEventType
} from '@angular/common/http';

import { RoomDialogComponent } from '../room-dialog/room-dialog.component';
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
  dataSource: MatTableDataSource<Room>;
  colunas: string[] = [
    'name',
    'description',
    'capacity',
    'available_seats',
    'id'
  ];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  private rooms: Room[] = [];
  private details: any[] = [];

  constructor(
    private roomService: RoomService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.list();
    //criar um subscribe do método que eu criei event emmiter no service, dar um push no array rooms
  }

  list() {
    {
      this.roomService.list().subscribe(
        data => {
          this.rooms = data as Room[];
          this.dataSource = new MatTableDataSource<Room>(this.rooms);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          console.log(this.rooms);
        },
        err => {
          const msg: string = 'Erro obtendo salas.';
          this.snackBar.open(msg, 'Erro', { duration: 5000 });
        }
      );
      console.log(this.rooms);
    }
  }
  openDialog() {
    const dialogRef = this.dialog.open(RoomDialogComponent, {
      width: '600px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.roomService
          .save(result.room, result.arquivo)
          .subscribe((room: any) => {
            if (room.type == HttpEventType.Response) {
              const r = room.body;
              const createdRoom = {
                name: r.name,
                description: r.description,
                capacity: r.capacity,
                available_video_projector: r.available_video_projector,
                available_AC: r.available_AC,
                available_seats: r.available_seats,
                seats_type: r.seats_type,
                location_id: r.location_id
                //r.photo
              };
              this.rooms.push(createdRoom);
              this.list();
            }
          });
        const msg: string = 'Sala cadastrada com sucesso.';
        this.snackBar.open(msg, 'Sucesso', { duration: 5000 });
      }
    });
  }

  delete(id) {
    this.roomService.delete(id).subscribe((room: any) => {
      const r = room;
      const deletedRoom = {
        id: r.id,
        name: r.name,
        description: r.description,
        capacity: r.capacity,
        available_video_projector: r.available_video_projector,
        available_AC: r.available_AC,
        available_seats: r.available_seats,
        seats_type: r.seats_type,
        location_id: r.location_id
        //r.photo
      };
      this.rooms = this.rooms.filter(item => {
        console.log('TRUE OR FALSE ?', item.id != deletedRoom.id);
        return item.id != deletedRoom.id;
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
