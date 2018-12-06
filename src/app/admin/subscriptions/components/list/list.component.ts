import { Component, OnInit, ViewChild } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { SubscriptionService } from '../../services/subscription.service';
import { Subscription } from '../../models/subscription.model';
import {
  HttpClientModule,
  HttpClient,
  HTTP_INTERCEPTORS,
  HttpEventType
} from '@angular/common/http';

import { SubscriptionDialogComponent } from '../subscription-dialog/subscription-dialog.component';
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
  dataSource: MatTableDataSource<Subscription>;
  colunas: string[] = [
    'name',
    'description',
    'beginning_date',
    'certificate',
  ];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  private subscriptions: Subscription[] = [];
  private details: any[] = [];

  constructor(
    private subscriptionService: SubscriptionService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.list();
    //criar um subscribe do método que eu criei event emmiter no service, dar um push no array events
  }

  list() {
    {
      this.subscriptionService.list().subscribe(
        data => {
          this.subscriptions = data as Subscription[];
          this.dataSource = new MatTableDataSource<Subscription>(
            this.subscriptions
          );
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          console.log(this.subscriptions);
        },
        err => {
          const msg: string = 'Erro obtendo inscrições.';
          this.snackBar.open(msg, 'Erro', { duration: 5000 });
        }
      );
      console.log(this.subscriptions);
    }
  }
  openDialog() {
    const dialogRef = this.dialog.open(SubscriptionDialogComponent, {
      width: '600px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.subscriptionService
          .save(result.event, result.arquivo)
          .subscribe((subscription: any) => {
            if (subscription.type == HttpEventType.Response) {
              const e = subscription.body;
              const createdSubscription = {
                name: e.name,
                description: e.description,
                beginning_date: e.beginning_date,
                end_date: e.end_date
                //e.photo
              };
              this.subscriptions.push(createdSubscription);
              this.list();
            }
          });
        const msg: string = 'Inscrição realizada com sucesso.';
        this.snackBar.open(msg, 'Sucesso', { duration: 5000 });
      }
    });
  }

  delete(id) {
    this.subscriptionService.delete(id).subscribe((subscription: any) => {
      console.log('EVENTO TYPE', subscription);
      console.log('ATUALIZADO', this.subscriptions);
      const s = subscription;
      const deletedSubscription = {
        id: s.id,
        name: s.name,
        description: s.description,
        beginning_date: s.beginning_date,
        end_date: s.end_date
        //e.photo
      };
      this.subscriptions = this.subscriptions.filter(item => {
        console.log('TRUE OR FALSE ?', item.id != deletedSubscription.id);
        return item.id != deletedSubscription.id;
      });
      this.list();
    });
  }

  getCertified(event_id, user_id, action_id) {
    const params = {
      event_id: event_id,
      user_id: user_id
    }
    if (action_id == 1) {
      this.subscriptionService.getCertified(params).subscribe(
        data => {
          const msg: string = 'Sucesso em realizar download do certificado.';
          this.snackBar.open(msg, 'Successo', { duration: 5000 });
          this.subscriptions = null;
          this.dataSource = null;
          this.list();
        },
        err => {
          const msg: string = 'Erro ao realizar download do certificado.';
          this.snackBar.open(msg, 'Erro', { duration: 5000 });
        }
      )
    }
    else if (action_id == 0 && confirm('Você confirma o cancelamento da presença?')) {
      this.subscriptionService.getCertified(params).subscribe(
        data => {
          const msg: string = 'Sucesso em realizar cancelamento da inscrição.';
          this.snackBar.open(msg, 'Successo', { duration: 5000 });
          this.subscriptions = null;
          this.dataSource = null;
          this.list();
        },
        err => {
          const msg: string = 'Erro ao realizar cancelamento da inscrição.';
          this.snackBar.open(msg, 'Erro', { duration: 5000 });
        }
      )
    }
  }



  cancel(subscription_id, check_in) {
    if (check_in == 0 && confirm('Você confirma o cancelamento da inscrição?')) {
      this.subscriptionService.cancel(subscription_id).subscribe(
        data => {
          const msg: string = 'Sucesso em realizar cancelamento.';
          this.snackBar.open(msg, 'Successo', { duration: 5000 });
          this.subscriptions = null;
          this.dataSource = null;
          this.list();
        },
        err => {
          this.subscriptions = null;
          this.dataSource = null;
          this.list();
        }
      )
    }
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
