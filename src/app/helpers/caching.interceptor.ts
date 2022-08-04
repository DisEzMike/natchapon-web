import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class CachingInterceptor implements HttpInterceptor {
  responseCache = new Map();
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (!this.canCache(request)) {
      return next.handle(request);
    }

    const cache = this.responseCache.get(request.urlWithParams);
    if (cache) {
      return of(cache);
    }

    return next.handle(request).pipe(
      tap((response) => {
        this.responseCache.set(request.urlWithParams, response);
      })
    );
  }

  canCache(req: HttpRequest<unknown>): boolean {
    return req.urlWithParams.includes('?cache=true');
  }
}
