import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";

export const jwtInterceptor: HttpInterceptorFn = (request: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const token = localStorage.getItem('');
  const req = request.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    }
  });

  return next(req);
};
