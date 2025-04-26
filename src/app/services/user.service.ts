import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateUserRequestDto } from '../models/requests/create-user.request.dto';
import { CreateResponseDto } from '../models/responses/create.response.dto';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl: string = 'http://localhost:8080/api/v1/users';

  constructor(
    private http: HttpClient,
  ) { }

  create(createUserDto: CreateUserRequestDto): Observable<CreateResponseDto> {
    return this.http.post<CreateResponseDto>(`${this.baseUrl}/create`, createUserDto);
  }
}
