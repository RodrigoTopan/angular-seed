import { Component, OnInit, ViewChild } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import {
  MatTableDataSource,
  MatSnackBar,
  PageEvent,
  MatPaginator,
  Sort,
  MatSort
} from '@angular/material';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/of';

import { LancamentoService, Lancamento } from '../../../../shared';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  dataSource: MatTableDataSource<Lancamento>;
  colunas: string[] = ['data', 'tipo', 'localizacao'];

  constructor(
    private lancamentoService: LancamentoService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.lancamentoService.listarTodosLancamentos().subscribe(
      data => {
        const lancamentos = data['data'] as Lancamento[];
        this.dataSource = new MatTableDataSource<Lancamento>(lancamentos);
      },
      err => {
        const msg: string = 'Erro obtendo lançamentos.';
        this.snackBar.open(msg, 'Erro', { duration: 5000 });
      }
    );
  }
}
