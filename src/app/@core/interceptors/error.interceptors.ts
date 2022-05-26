import { Injectable, NgZone } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { DialogService } from '../../@theme/modules/dialog';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private dialogSvc: DialogService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(tap(
      res => this.handleResponse(res, req, next),
      err => this.handleResponse(err, req, next)
    ));
  }

  private handleResponse(res: any, req, next): void {
    if (typeof res.status === 'number') {
      if (res.status === 200) {
      } else {
        this.dialogSvc.show({content: '用户名或密码错误，请重新登录!', confirm: '我知道了', cancel: ''}).subscribe();
      }
    }
  }
}
