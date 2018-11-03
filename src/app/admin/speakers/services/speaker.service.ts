import { Injectable } from '@angular/core'; //injetar o serviço
import { Observable } from 'rxjs'; //acesso a apis externas de modo assincrono
import { HttpClient, HttpEventType } from '@angular/common/http'; //responsável pelo acesso http a nossa api externa
import { environment as env } from '../../../../environments/environment';
import { Router } from '@angular/router';
import { Speaker } from '../models/speaker.model';

@Injectable({
  providedIn: 'root'
})
export class SpeakerService {
  private readonly PATH: string = 'speakers';
  public speakers: Speaker[] = [];
  public speaker: Speaker;

  constructor(private http: HttpClient, private router: Router) {}

  list(): Observable<any> {
    return this.http.get(env.baseApiUrl + this.PATH);
  }

  find(id): Observable<any> {
    return this.http.get(env.baseApiUrl + this.PATH + '/' + id);
  }

  save(speaker: Speaker, file: File): Observable<any> {
    //Em casos que se queira enviar arquivos junto com a requisição
    //utilizar form-data
    const uploadData = new FormData();
    uploadData.append('name', speaker.name);
    uploadData.append('type', speaker.type);
    uploadData.append('small_desc', speaker.small_desc);
    uploadData.append('linkedin', speaker.linkedin);
    uploadData.append('facebook', speaker.facebook);
    uploadData.append('twitter', speaker.twitter);
    uploadData.append('website', speaker.website);

    // uploadData.append('file',file, file.name);

    return this.http.post(env.baseApiUrl + this.PATH, uploadData, {
      reportProgress: true,
      observe: 'events'
    });
  }

  edit(speaker: Speaker): Observable<any> {
    return this.http.put(
      env.baseApiUrl + this.PATH + '/' + speaker.id,
      speaker,
      {
        reportProgress: true,
        observe: 'events'
      }
    );
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
