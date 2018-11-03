import { Injectable, NgModule } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse
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
    if (
      localStorage.getItem('user') ||
      this.path === 'login' ||
      this.path === 'register'
    ) {
      console.log('INTERCEPTOR FUNCIONANDO');
      const dupReq = req.clone({
        headers: req.headers.set(
          'Authorization',
          'Bearer ' + localStorage['token']
        )
      });
      return next.handle(dupReq).pipe(
        tap(
          event => {
            if (event instanceof HttpResponse) {
              console.log(' all looks good');
              // http response status code
              console.log(event.status);
            }
          },
          error => {
            // http response status code
            console.log('----response----');
            console.error('status code:');
            console.error(error.status);
            console.error(error.message);
            console.log('--- end of response---');
            if (error.status === '401') {
              console.log('Não autenticado');
              window.location.href = 'http://localhost:4200/login';
            }
          }
        )
      );
    } else {
      console.log('Não autenticado');
      window.location.href = 'http://localhost:4200/login';
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
