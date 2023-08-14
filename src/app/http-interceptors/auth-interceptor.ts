import { Injectable } from '@angular/core';
import { AccountService } from '../account/shared/account.service';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpErrorResponse,
} from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private accountService: AccountService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = this.accountService.getAuthorizationToken();
    let request: HttpRequest<any> = req;

    if (token) {
      request = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`),
      });
    }
    return next.handle(request).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Erro de client-side ou de rede
      console.error('ocorreu um error: ', error.error.message);
    } else {
      // Erro retornando do backend
      console.error(
        `Código do erro ${error.status},` +
          `Erro: ${JSON.stringify(error.error)}`
      );
    }
    // Retornar
    return throwError('Ocorreu um error, tente novamente.');
  }
}
