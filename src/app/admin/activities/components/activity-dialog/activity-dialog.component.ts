import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Activity } from '../../models/activity.model';
import { ActivityService } from '../../services/activity.service';

@Component({
  selector: 'app-activity-dialog',
  templateUrl: './activity-dialog.component.html',
  styleUrls: ['./activity-dialog.component.css']
})
export class ActivityDialogComponent implements OnInit {
  private nomearquivo: string = '';
  private schedules: any[] = [];
  private events: any[] = [];
  private locations: any[] = [];
  private rooms: any[] = []; 

  private dados = {
    activity: new Activity('', '', '', 0, 0, 0, 0, 0, 0),
    arquivo: null
  };

  constructor(public dialogRef: MatDialogRef<ActivityDialogComponent>,private activityService: ActivityService) {}

  ngOnInit() {
    this.loadFormValues();
  }

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

  loadFormValues(){
    this.activityService.getFormValues().subscribe(
      data => {
        this.schedules = data['schedules'];
        this.events = data['events'];
        this.locations = data['locations'];
        this.rooms = data['rooms']; 
      },
      err => {

      }
    )
  }
}
