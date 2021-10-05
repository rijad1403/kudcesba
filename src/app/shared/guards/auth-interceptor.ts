import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    const token = localStorage.getItem('token');
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
    return next.handle(request).pipe(
      tap(
        () => {},
        (err: any) => {
          if (err instanceof HttpErrorResponse || err.errors) {
            if (err.status !== 401 && err.status !== 400) {
              // this.functionService.presentToast("Error! " + err.message, 4000, "danger", 0);
              return;
            } else {
              if (err.status === 401 && token) {
                alert('error');
                setTimeout(() => {
                  localStorage.removeItem('currentUser');
                  localStorage.removeItem('token');
                  this.router.navigate(['login']);
                }, 3000);
              } else {
                if (token) {
                }
              }
            }
          }
        }
      )
    );
  }
}
