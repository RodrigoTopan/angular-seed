import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Speaker } from '../../models/speaker.model';

@Component({
  selector: 'app-speaker-dialog',
  templateUrl: './speaker-dialog.component.html',
  styleUrls: ['./speaker-dialog.component.css']
})
export class SpeakerDialogComponent implements OnInit {
  private nomearquivo: string = '';

  private dados = {
    event: new Speaker('', '', '', ''),
    arquivo: null
  };

  constructor(public dialogRef: MatDialogRef<SpeakerDialogComponent>) {}

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
