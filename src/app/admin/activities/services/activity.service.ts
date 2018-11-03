import { Injectable } from '@angular/core'; //injetar o serviço
import { Observable } from 'rxjs'; //acesso a apis externas de modo assincrono
import { HttpClient } from '@angular/common/http'; //responsável pelo acesso http a nossa api externa
import { environment as env } from '../../../../environments/environment';
import { Activity } from '../models/activity.model';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  private readonly PATH: string = 'activities';
  constructor(private http: HttpClient) {}

  list(event_id): Observable<any> {
    return this.http.get(env.baseApiUrl + 'events' + '/' + event_id);
  }

  save(activity: any, file: File): Observable<any> {
    const uploadData = new FormData();
    uploadData.append('name', activity.name);
    uploadData.append('description', activity.description);
    uploadData.append(
      'beginning_date',
      this.dateFormat(activity.beginning_date)
    );
    uploadData.append('minimum_quorum', activity.minimum_quorum);
    uploadData.append('maximum_capacity', activity.maximum_capacity);
    uploadData.append('schedule_id', activity.schedule_id);
    uploadData.append('event_id', activity.event_id);
    uploadData.append('location_id', activity.location_id);
    uploadData.append('room_id', activity.room_id);

    return this.http.post(env.baseApiUrl + this.PATH, uploadData, {
      reportProgress: true,
      observe: 'events'
    });
  }
  dateFormat(dateToFormat) {
    var date = new Date(dateToFormat);
    var year = date.getFullYear();
    var month = date.getMonth() + 1; //getMonth is zero based;
    var day = date.getDate();
    var formatted = year + '-' + month + '-' + day;
    return formatted;
  }
}
