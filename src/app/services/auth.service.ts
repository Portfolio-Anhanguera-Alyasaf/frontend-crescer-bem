import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthRequestDto } from '../models/requests/auth.request.dto';
import { AuthResponseDto } from '../models/responses/auth.response.dto';

@Injectable()
export class AuthService {
  private baseUrl: string = 'http://localhost:8080/api/v1/auth';

  constructor(
    private http: HttpClient,
  ) { }

  login(credentials: AuthRequestDto): Observable<AuthResponseDto> {
    return this.http.post<any>(`${this.baseUrl}/login`, credentials);
  }
}
