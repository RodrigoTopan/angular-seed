import { Injectable, NgModule } from '@angular/core';
import { Observable } from 'rxjs';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class HttpsRequestInterceptor implements HttpInterceptor {
  private router: Router;
  private path: String;
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.path = window.location.href;
    this.path = this.path.replace('/edit', '');
    let splited_path = this.path.split('/');
    this.path = splited_path[3];
    console.log('ROTA INTERCEPTADA', this.path);
    const token = localStorage.getItem('token');
    console.log('TEM TOKEN?', token);
    if (localStorage.getItem('user') || this.path === 'login') {
      console.log('INTERCEPTOR FUNCIONANDO');
      //let h = req.headers.set('Content-Type', 'application/json');
      //h.set('Authorization', 'Bearer ' + token);
      const dupReq = req.clone({
        headers: req.headers.set(
  	  	'Authorization', 'Bearer ' + localStorage['token']
  	  );
      });
      return next.handle(dupReq);
    } else {
      console.log('Não autenticado');
      window.location.href = 'http://localhost:4200/login'
    }
  }
}

@NgModule({
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpsRequestInterceptor,
      multi: true
    }
  ]
})
export class InterceptorModule {}
