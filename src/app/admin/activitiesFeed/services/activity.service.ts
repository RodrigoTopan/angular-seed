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

  save(subscription: any, file: File): Observable<any> {
    const uploadData = new FormData();
    uploadData.append('user_id', subscription.user_id);
    uploadData.append('activity_id', subscription.activity_id);
    uploadData.append('event_id', subscription.event_id);

    return this.http.post(env.baseApiUrl + 'subscriptions', uploadData, {
      reportProgress: true,
      observe: 'events'
    });
  }
}
