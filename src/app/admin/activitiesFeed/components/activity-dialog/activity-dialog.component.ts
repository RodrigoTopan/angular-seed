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

  constructor(public dialogRef: MatDialogRef<ActivityDialogComponent>) {}

  ngOnInit() {}

  changefile() {}

  save() {
    this.dialogRef.close(1);
  }

  cancel() {
    this.dialogRef.close(null);
  }
}
