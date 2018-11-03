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
    speaker: new Speaker('', '', '', ''),
    arquivo: null
  };

  constructor(public dialogRef: MatDialogRef<SpeakerDialogComponent>) {}

  ngOnInit() {}

  changefile(speaker) {
    this.nomearquivo = speaker.target.files[0].name;
    this.dados.arquivo = speaker.target.files[0];
  }

  save() {
    this.dialogRef.close(this.dados);
  }

  cancel() {
    this.dialogRef.close(null);
  }
}
