import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Event } from '../../models/event.model';

@Component({
  selector: 'app-event-dialog',
  templateUrl: './event-dialog.component.html',
  styleUrls: ['./event-dialog.component.css']
})
export class EventDialogComponent implements OnInit {
  private nomearquivo: string = '';

  private dados = {
    event: new Event('', '', '', ''),
    arquivo: null
  };

  constructor(public dialogRef: MatDialogRef<EventDialogComponent>) {}

  ngOnInit() {}

  changefile(event) {
    this.nomearquivo = event.target.files[0].name;
    this.dados.arquivo = event.target.files[0];
  }

  save() {
    this.dialogRef.close(this.dados);
  }

  cancel() {
    this.dialogRef.close(null);
  }
}
