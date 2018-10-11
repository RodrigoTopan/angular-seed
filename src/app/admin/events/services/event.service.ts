import { Injectable } from '@angular/core'; //injetar o serviço
import { Observable } from 'rxjs'; //acesso a apis externas de modo assincrono
import { HttpClient } from '@angular/common/http'; //responsável pelo acesso http a nossa api externa
import { environment as env } from '../../../../environments/environment';
import { Event } from '../models/event.model';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private readonly PATH: string = 'events';
  constructor(private http: HttpClient) {}

  list(): Observable<any> {
    return this.http.get(env.baseApiUrl + this.PATH);
  }
}
