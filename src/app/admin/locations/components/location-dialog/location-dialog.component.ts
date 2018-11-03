import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Location } from '../../models/location.model';

@Component({
  selector: 'app-location-dialog',
  templateUrl: './location-dialog.component.html',
  styleUrls: ['./location-dialog.component.css']
})
export class LocationDialogComponent implements OnInit {
  private nomearquivo: string = '';

  private dados = {
    location: new Location(
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      ''
    ),
    arquivo: null
  };

  constructor(public dialogRef: MatDialogRef<LocationDialogComponent>) {}

  ngOnInit() {}

  changefile(location) {
    this.nomearquivo = location.target.files[0].name;
    this.dados.arquivo = location.target.files[0];
  }

  save() {
    this.dialogRef.close(this.dados);
  }

  cancel() {
    this.dialogRef.close(null);
  }
}
