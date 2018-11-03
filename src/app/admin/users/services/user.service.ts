import { Injectable } from '@angular/core'; //injetar o serviço
import { Observable } from 'rxjs'; //acesso a apis externas de modo assincrono
import { HttpClient, HttpEventType } from '@angular/common/http'; //responsável pelo acesso http a nossa api externa
import { environment as env } from '../../../../environments/environment';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly PATH: string = 'users';
  public user: User;

  constructor(private http: HttpClient, private router: Router) {}

  getUserDetails(): Observable<any> {
    return this.http.get(env.baseApiUrl + this.PATH);
  }
}
