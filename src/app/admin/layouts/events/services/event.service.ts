import { Injectable } from '@angular/core'; //injetar o serviço
import { Observable } from 'rxjs'; //acesso a apis externas de modo assincrono

import { HttpClient } from '@angular/common/http'; //responsável pelo acesso http a nossa api externa
import { environment as env } from '../../../../../environments/environment';

import { Event } from '../models/event.model';

@Injectable()
export class EventService {
  private readonly PATH: string = 'event';
  constructor(private http: HttpClient) {}

  /**
   * O observable envia a requisição e fica escutando a porta pra ver se chegou a resposta
   * Bate no endpoint auth enviando o objeto que possui as credenciais do usuário
   * @param event 
   */
  list(event: Event): Observable<any> {
    return this.http.get(env.baseApiUrl + this.PATH + '/list');
  }

  /**
   * O observable envia a requisição e fica escutando a porta pra ver se chegou a resposta
   * Bate no endpoint auth enviando o objeto que possui as credenciais do usuário
   * @param event 
   */
  create(event: Event): Observable<any> {
    return this.http.post(env.baseApiUrl + this.PATH + '/create', event);
  }

  /**
   * Pesquisa por id
   * @param id 
   */
  find(id): Observable<any> {
    return this.http.get(env.baseApiUrl + this.PATH + '/' + id);
  }
}
