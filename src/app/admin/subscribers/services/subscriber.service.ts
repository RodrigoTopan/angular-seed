import { Injectable } from '@angular/core'; //injetar o serviço
import { Observable } from 'rxjs'; //acesso a apis externas de modo assincrono
import { HttpClient } from '@angular/common/http'; //responsável pelo acesso http a nossa api externa
import { environment as env } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubscriberService {
  private readonly PATH: string = 'activities';
  constructor(private http: HttpClient) {}

  list(activity_id): Observable<any> {
    return this.http.get(env.baseApiUrl + 'activities' + '/' + activity_id);
  }

}
