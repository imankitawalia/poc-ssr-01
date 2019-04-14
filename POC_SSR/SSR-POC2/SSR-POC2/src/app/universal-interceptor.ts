import {Injectable, Inject, Optional} from '@angular/core';
import {HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders} from '@angular/common/http';
import {Request} from 'express';
import {REQUEST} from '@nguniversal/express-engine/tokens';

@Injectable()
export class UniversalInterceptor implements HttpInterceptor {

  constructor(@Optional() @Inject(REQUEST) protected request: Request) {}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let serverReq: HttpRequest<any> = req;
    if (this.request) {
      let newUrl = `${this.request.protocol}://${this.request.get('host')}`;
      console.log('new url : ', newUrl);
      if (!req.url.startsWith('/')) {
        newUrl += '/';
        console.log('In if new url : ', newUrl);
      }
      console.log('After if request url : ', req.url);
      newUrl += req.url;
      console.log('After if new url : ', newUrl);
      serverReq = req.clone({url: newUrl});
    }
    return next.handle(serverReq);
  }
}
