import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { catchError, from, switchMap, throwError } from "rxjs";
import { AuthResponseDto } from "../models/responses/auth.response.dto";
import { AuthService } from "../services/auth.service";

export const jwtInterceptor: HttpInterceptorFn = (request: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const token = localStorage.getItem('token');
  const authService: AuthService = inject(AuthService);

  if (token && (request.url.includes('/login') || request.url.includes('/refresh'))) {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      }
    });
  }

  return next(request).pipe(
    catchError((error: HttpEvent<unknown>) => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        return from(authService.refresh()).pipe(
          switchMap((value: AuthResponseDto) => {
            if (value) {
              localStorage.setItem('token', value.token);
              localStorage.setItem('refreshToken', value.refreshToken);
              localStorage.setItem('expirationToken', value.expirationToken);

              const newReq = request.clone({
                setHeaders: {
                  Authorization: `Bearer ${value.token}`
                }
              });

              return next(newReq);
            }

            return throwError(() => error);
          }

          ),
          catchError(error => {
            authService.logout();
            return throwError(() => error);
          })
        )
      }

      return throwError(() => error);
    }),
  );
};
