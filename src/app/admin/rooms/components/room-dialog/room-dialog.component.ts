import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Room } from '../../models/room.model';

@Component({
  selector: 'app-room-dialog',
  templateUrl: './room-dialog.component.html',
  styleUrls: ['./room-dialog.component.css']
})
export class RoomDialogComponent implements OnInit {
  private nomearquivo: string = '';

  private dados = {
    room: new Room('', '', '', '', '', '', '', '', ''),
    arquivo: null
  };

  constructor(public dialogRef: MatDialogRef<RoomDialogComponent>) {}

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
