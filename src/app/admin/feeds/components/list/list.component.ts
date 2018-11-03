import { Component, OnInit, ViewChild } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { FeedService } from '../../services/feed.service';
import { Feed } from '../../models/feed.model';
import {
  HttpClientModule,
  HttpClient,
  HTTP_INTERCEPTORS,
  HttpEventType
} from '@angular/common/http';

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
  dataSource: MatTableDataSource<Feed>;
  colunas: string[] = [
    'name',
    'description',
    'beginning_date',
    'end_date',
    'id'
  ];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  private feeds: Feed[] = [];
  private feed: Feed;
  private details: any[] = [];

  constructor(
    private feedService: FeedService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.list();
    //criar um subscribe do método que eu criei event emmiter no service, dar um push no array events
  }

  list() {
    {
      this.feedService.list().subscribe(
        data => {
          this.feeds = data[0] as Feed[];
          this.dataSource = new MatTableDataSource<Feed>(this.feeds);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          console.log(this.feeds);
        },
        err => {
          const msg: string = 'Erro obtendo feed.';
          this.snackBar.open(msg, 'Erro', { duration: 5000 });
        }
      );
      console.log(this.feeds);
    }
  }

  find(id) {
    this.feedService.find(id).subscribe(
      data => {
        this.feed = data as Feed;
        console.log(this.feed);
      },
      err => {
        const msg: string = 'Erro obtendo feed.';
        this.snackBar.open(msg, 'Erro', { duration: 5000 });
      }
    );
    console.log(this.feed);
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
