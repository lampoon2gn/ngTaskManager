import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable } from 'rxjs';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class HeaderInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
      const Authorization ="bearer "+ sessionStorage.getItem('userToken');
      //const Authorization = '12345';
      //return next.handle(req.clone({setHeaders:{Authorization:localStorage.getItem('userToken')}}));
      return next.handle(req.clone({setHeaders:{Authorization:Authorization}}));
      //return next.handle(req);
  }
}