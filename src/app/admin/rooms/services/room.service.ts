import { Injectable } from '@angular/core'; //injetar o serviço
import { Observable } from 'rxjs'; //acesso a apis externas de modo assincrono
import { HttpClient, HttpEventType } from '@angular/common/http'; //responsável pelo acesso http a nossa api externa
import { environment as env } from '../../../../environments/environment';
import { Router } from '@angular/router';
import { Room } from '../models/room.model';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private readonly PATH: string = 'rooms';
  public rooms: Room[] = [];
  public room: Room;

  constructor(private http: HttpClient, private router: Router) {}

  list(): Observable<any> {
    return this.http.get(env.baseApiUrl + this.PATH);
  }

  find(id): Observable<any> {
    return this.http.get(env.baseApiUrl + this.PATH + '/' + id);
  }

  save(room: Room, file: File): Observable<any> {
    //Em casos que se queira enviar arquivos junto com a requisição
    //utilizar form-data
    const uploadData = new FormData();
    uploadData.append('name', room.name);
    uploadData.append('description', room.description);
    uploadData.append('capacity', room.capacity);
    uploadData.append(
      'available_video_projector',
      room.available_video_projector
    );
    uploadData.append('available_AC', room.available_AC);
    uploadData.append('available_seats', room.available_seats);
    uploadData.append('seats_type', room.seats_type);
    uploadData.append('location_id', room.location_id);
    // uploadData.append('file',file, file.name);

    return this.http.post(env.baseApiUrl + this.PATH, uploadData, {
      reportProgress: true,
      observe: 'events'
    });
  }

  edit(room: Room): Observable<any> {
    return this.http.put(env.baseApiUrl + this.PATH + '/' + room.id, room, {
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
