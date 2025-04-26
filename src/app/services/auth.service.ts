import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { AuthRefreshRequestDto } from '../models/requests/auth-refresh.request.dto';
import { AuthRequestDto } from '../models/requests/auth.request.dto';
import { AuthResponseDto } from '../models/responses/auth.response.dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl: string = 'http://localhost:8080/api/v1/auth';

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  login(credentials: AuthRequestDto): Promise<AuthResponseDto> {
    return firstValueFrom(this.http.post<AuthResponseDto>(`${this.baseUrl}/login`, credentials, {
      headers: {
        "Content-Type": "application/json",
      }
    }));
  }

  refresh(): Promise<AuthResponseDto> {
    const refreshTokenStorage = localStorage.getItem('refreshToken');
    if (!refreshTokenStorage) {
      return Promise.reject();
    }

    const refreshToken = <AuthRefreshRequestDto>{
      refreshToken: refreshTokenStorage,
    }

    return firstValueFrom(this.http.post<AuthResponseDto>(`${this.baseUrl}/refresh`, refreshToken, {
      headers: {
        "Content-Type": "application/json",
      }
    }));
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('expirationToken');

    this.router.navigate(['/login']);
  }
}
