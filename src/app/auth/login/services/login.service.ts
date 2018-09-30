import { Injectable } from '@angular/core';//injetar o serviço
import { Observable } from 'rxjs';//acesso a apis externas de modo assincrono 

import { HttpClient } from '@angular/common/http';//responsável pelo acesso http a nossa api externa
import { environment as env } from '../../../../environments/environment';

import { Login } from '../models/login.model';


@Injectable()

export class LoginService {

  private readonly PATH: string = 'login';
  constructor(private http: HttpClient) { }

  /**
   * O observable envia a requisição e fica escutando a porta pra ver se chegou a resposta
   * Bate no endpoint auth enviando o objeto que possui as credenciais do usuário
   * @param login 
   */
  login(login: Login): Observable<any> {
    return this.http.post(env.baseApiUrl + this.PATH, login);
  }
}
