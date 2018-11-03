import { Component, OnInit, ViewChild } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { LocationService } from '../../services/location.service';
import { Location } from '../../models/location.model';
import {
  HttpClientModule,
  HttpClient,
  HTTP_INTERCEPTORS,
  HttpEventType
} from '@angular/common/http';

import { LocationDialogComponent } from '../location-dialog/location-dialog.component';
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
  dataSource: MatTableDataSource<Location>;
  colunas: string[] = [
    'name',
    'full_adress',
    'adress_number',
    'city',
    'state',
    'id'
  ];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  private locations: Location[] = [];
  private details: any[] = [];

  constructor(
    private locationService: LocationService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.list();
    //criar um subscribe do método que eu criei event emmiter no service, dar um push no array events
  }

  list() {
    {
      this.locationService.list().subscribe(
        data => {
          this.locations = data as Location[];
          this.dataSource = new MatTableDataSource<Location>(this.locations);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          console.log(this.locations);
        },
        err => {
          const msg: string = 'Erro obtendo locais.';
          this.snackBar.open(msg, 'Erro', { duration: 5000 });
        }
      );
      console.log(this.locations);
    }
  }
  openDialog() {
    const dialogRef = this.dialog.open(LocationDialogComponent, {
      width: '600px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.locationService
          .save(result.location, result.arquivo)
          .subscribe((location: any) => {
            if (location.type == HttpEventType.Response) {
              const l = location.body;
              const createdLocation = {
                name: l.name,
                postal_code: l.postal_code,
                adress_number: l.adress_number,
                full_adress: l.full_adress,
                district: l.district,
                city: l.city,
                state: l.state,
                reference_point: l.reference_point,
                work_days: l.work_days,
                open_hours: l.open_hours,
                close_hour: l.close_hour,
                manager_name: l.manager_name,
                manager_phone_number: l.manager_phone_number,
                manager_email: l.manager_email,
                adress_complement: l.adress_complement
                //e.photo
              };
              this.locations.push(createdLocation);
              this.list();
            }
          });
        const msg: string = 'Local cadastrado com sucesso.';
        this.snackBar.open(msg, 'Sucesso', { duration: 5000 });
      }
    });
  }

  delete(id) {
    this.locationService.delete(id).subscribe((location: any) => {
      const l = location;
      const deletedLocation = {
        id: l.id,
        name: l.name,
        description: l.description,
        beginning_date: l.beginning_date,
        end_date: l.end_date
        //e.photo
      };

      this.locations = this.locations.filter(item => {
        console.log('TRUE OR FALSE ?', item.id != deletedLocation.id);
        return item.id != deletedLocation.id;
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
