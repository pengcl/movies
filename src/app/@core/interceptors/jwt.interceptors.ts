import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class JwtInterceptors implements HttpInterceptor {
  constructor() {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const userToken = '';
    const version = '1.0.0';
    const head: any = {
      clientIP: '192.168.103.56',
      questUID: 'C943B16E39A00001715A87502E1A1D65',
      userToken,
      version
    };
    req.body.head = head;
    return next.handle(req);
  }

}
