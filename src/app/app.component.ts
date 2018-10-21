import { Component } from '@angular/core';
import {
  HttpClientModule,
  HttpClient,
  HTTP_INTERCEPTORS
} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angularseed';
}
