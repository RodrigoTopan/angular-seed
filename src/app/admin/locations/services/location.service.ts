import { Injectable } from '@angular/core'; //injetar o serviço
import { Observable } from 'rxjs'; //acesso a apis externas de modo assincrono
import { HttpClient, HttpEventType } from '@angular/common/http'; //responsável pelo acesso http a nossa api externa
import { environment as env } from '../../../../environments/environment';
import { Router } from '@angular/router';
import { Location } from '../models/location.model';

/*
EXAMPLE
{
    "'name',": "Local",
    "'postal_code',": "11700-780",
    "'adress_number',": "38",
    "'adress_complement',": "apartamento",
    "'full_adress',": "localidade endereço",
    "'district',": "SP",
    "'city',": "São Paulo",
    "'state',": "SP",
    "'reference_point',": "Canhão",
    "'work_days',": "7",
    "'open_hours',": "9",
    "'close_hour',": "18",
    "'manager_name',": "Rafael",
    "'manager_phone_number',": "(11)994213400",
    "'manager_email',": "rafael.topan@gmail.com",
    "'updated_at',": "2018-10-24 21:01:59",
    "'created_at',": "2018-10-24 21:01:59",
    "'id',": 1
}
*/

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private readonly PATH: string = 'locations';
  public locations: Location[] = [];
  public location: Location;

  constructor(private http: HttpClient, private router: Router) {}

  list(): Observable<any> {
    return this.http.get(env.baseApiUrl + this.PATH);
  }

  find(id): Observable<any> {
    return this.http.get(env.baseApiUrl + this.PATH + '/' + id);
  }

  save(location: Location, file: File): Observable<any> {
    //Em casos que se queira enviar arquivos junto com a requisição
    //utilizar form-data
    const uploadData = new FormData();
    uploadData.append('name', location.name);
    uploadData.append('postal_code', location.postal_code);
    uploadData.append('adress_number', location.adress_number);
    uploadData.append('adress_complement', location.adress_complement);
    uploadData.append('full_adress', location.full_adress);
    uploadData.append('district', location.district);
    uploadData.append('city', location.city);
    uploadData.append('state', location.state);
    uploadData.append('reference_point', location.reference_point);
    uploadData.append('work_days', location.work_days);
    uploadData.append('open_hours', location.open_hours);
    uploadData.append('close_hour', location.close_hour);
    uploadData.append('manager_name', location.manager_name);
    uploadData.append('manager_phone_number', location.manager_phone_number);
    uploadData.append('manager_email', location.manager_email);
    // uploadData.append('file',file, file.name);

    return this.http.post(env.baseApiUrl + this.PATH, uploadData, {
      reportProgress: true,
      observe: 'events'
    });
  }

  edit(location: Location): Observable<any> {
    return this.http.put(
      env.baseApiUrl + this.PATH + '/' + location.id,
      location,
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
