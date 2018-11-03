import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Subscription } from '../../models/subscription.model';

@Component({
  selector: 'app-subscription-dialog',
  templateUrl: './subscription-dialog.component.html',
  styleUrls: ['./subscription-dialog.component.css']
})
export class SubscriptionDialogComponent implements OnInit {
  private nomearquivo: string = '';

  private dados = {
    subscription: new Subscription('', '', '', ''),
    arquivo: null
  };

  constructor(public dialogRef: MatDialogRef<SubscriptionDialogComponent>) {}

  ngOnInit() {}

  changefile(subscription) {
    this.nomearquivo = subscription.target.files[0].name;
    this.dados.arquivo = subscription.target.files[0];
  }

  save() {
    this.dialogRef.close(this.dados);
  }

  cancel() {
    this.dialogRef.close(null);
  }
}
