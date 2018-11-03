import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Activity } from '../../models/activity.model';

@Component({
  selector: 'app-activity-dialog',
  templateUrl: './activity-dialog.component.html',
  styleUrls: ['./activity-dialog.component.css']
})
export class ActivityDialogComponent implements OnInit {
  private nomearquivo: string = '';

  private dados = {
    activity: new Activity('', '', '', 0, 0, 0, 0, 0, 0),
    arquivo: null
  };

  constructor(public dialogRef: MatDialogRef<ActivityDialogComponent>) {}

  ngOnInit() {}

  changefile(activity) {
    this.nomearquivo = activity.target.files[0].name;
    this.dados.arquivo = activity.target.files[0];
  }

  save() {
    this.dialogRef.close(this.dados);
  }

  cancel() {
    this.dialogRef.close(null);
  }
}
