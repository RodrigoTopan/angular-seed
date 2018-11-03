import { Injectable } from '@angular/core'; //injetar o serviço
import { Observable } from 'rxjs'; //acesso a apis externas de modo assincrono
import { HttpClient, HttpEventType } from '@angular/common/http'; //responsável pelo acesso http a nossa api externa
import { environment as env } from '../../../../environments/environment';
import { Router } from '@angular/router';
import { Feed } from '../models/feed.model';

@Injectable({
  providedIn: 'root'
})
export class FeedService {
  private readonly PATH: string = 'feeds';
  public feeds: Feed[] = [];
  public feed: Feed;

  constructor(private http: HttpClient, private router: Router) {}

  list(): Observable<any> {
    return this.http.get(env.baseApiUrl + this.PATH);
  }

  find(id): Observable<any> {
    return this.http.get(env.baseApiUrl + this.PATH + '/' + id);
  }

  save(feed: Feed, file: File): Observable<any> {
    //Em casos que se queira enviar arquivos junto com a requisição
    //utilizar form-data
    const uploadData = new FormData();
    uploadData.append('name', feed.name);
    uploadData.append('description', feed.description);
    uploadData.append('beginning_date', this.dateFormat(feed.beginning_date));
    uploadData.append('end_date', this.dateFormat(feed.end_date));
    // uploadData.append('file',file, file.name);

    return this.http.post(env.baseApiUrl + this.PATH, uploadData, {
      reportProgress: true,
      observe: 'events'
    });
  }

  edit(feed: Feed): Observable<any> {
    return this.http.put(env.baseApiUrl + this.PATH + '/' + feed.id, feed, {
      reportProgress: true,
      observe: 'events'
    });
  }

  delete(id): Observable<any> {
    return this.http.delete(env.baseApiUrl + this.PATH + '/' + id);
  }

  dateFormat(dateToFormat) {
    var date = new Date(dateToFormat);
    var year = date.getFullYear();
    var month = date.getMonth() + 1; //getMonth is zero based;
    var day = date.getDate();
    var formatted = year + '-' + month + '-' + day;
    return formatted;
  }

  //criar outro método para emitir evento que vai receber a resposta da api
}
