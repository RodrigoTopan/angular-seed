import { Subscription } from './../../subscriptions/models/subscription.model';
import { Injectable } from '@angular/core'; //injetar o serviço
import { Observable } from 'rxjs'; //acesso a apis externas de modo assincrono
import { HttpClient } from '@angular/common/http'; //responsável pelo acesso http a nossa api externa
import { environment as env } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubscriberService {
  constructor(private http: HttpClient) {}
  private readonly PATH: string = 'activities';

  list(activity_id): Observable<any> {
    return this.http.get(env.baseApiUrl + 'activities' + '/' + activity_id);
  }

  update(subscription_id,params): Observable<any> {
    return this.http.put(env.baseApiUrl + 'subscriptions' + '/' + subscription_id, params);
  }

  getAttendanceList(id){
    return this.http.get(env.baseUrl + 'subscriptions/' + id);
  }

}
