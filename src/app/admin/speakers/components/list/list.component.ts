import { Component, OnInit, ViewChild } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { SpeakerService } from '../../services/speaker.service';
import { Speaker } from '../../models/speaker.model';
import {
  HttpClientModule,
  HttpClient,
  HTTP_INTERCEPTORS,
  HttpEventType
} from '@angular/common/http';

import { SpeakerDialogComponent } from '../speaker-dialog/speaker-dialog.component';
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
  dataSource: MatTableDataSource<Speaker>;
  colunas: string[] = ['name', 'type', 'id'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  private speakers: Speaker[] = [];
  private details: any[] = [];

  constructor(
    private speakerService: SpeakerService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.list();
  }

  list() {
    {
      this.speakerService.list().subscribe(
        data => {
          console.log('DATAAA', data);
          this.speakers = data as Speaker[];
          this.dataSource = new MatTableDataSource<Speaker>(this.speakers);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          console.log(this.speakers);
        },
        err => {
          const msg: string = 'Erro obtendo palestrantes.';
          this.snackBar.open(msg, 'Erro', { duration: 5000 });
        }
      );
      console.log(this.speakers);
    }
  }
  openDialog() {
    const dialogRef = this.dialog.open(SpeakerDialogComponent, {
      width: '600px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('CADASTRO PALESTRANTE', result);
        this.speakerService
          .save(result.speaker, result.arquivo)
          .subscribe((speaker: any) => {
            if (speaker.type == HttpEventType.Response) {
              const e = speaker.body;
              const createdSpeaker = {
                name: e.name,
                type: e.type,
                linkedin: e.linkedin,
                facebook: e.facebook,
                twitter: e.twitter,
                small_desc: e.small_desc,
                website: e.website
              };
              console.log('LISTA DE PALESTRANTES', this.speakers);
              console.log('NOVO PALESTRANTE', createdSpeaker);
              this.speakers.push(createdSpeaker);
              console.log('ROTA', this.speakers);
              this.list();
            }
          });
        const msg: string = 'Palestrante cadastrado com sucesso.';
        this.snackBar.open(msg, 'Sucesso', { duration: 5000 });
      }
    });
  }

  delete(id) {
    console.log('DELEÇÃO DO EVENTO', id);
    this.speakerService.delete(id).subscribe((speaker: any) => {
      console.log('EVENTO TYPE', speaker);
      console.log('ATUALIZADO', this.speakers);
      const s = speaker;
      const deletedSpeaker = {
        id: s.id,
        name: s.name,
        description: s.description,
        beginning_date: s.beginning_date,
        end_date: s.end_date
        //e.photo
      };
      console.log('LISTA DE EVENTOS', this.speakers);
      console.log('DELETADO EVENTO', deletedSpeaker);

      this.speakers = this.speakers.filter(item => {
        console.log('TRUE OR FALSE ?', item.id != deletedSpeaker.id);
        return item.id != deletedSpeaker.id;
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
