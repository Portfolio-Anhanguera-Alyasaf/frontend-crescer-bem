import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateChildrenRequestDto } from '../models/requests/create-children.request.dto';
import { UpdateChildrenRequestDto } from '../models/requests/update-children.request.dto';
import { ChildrenResponseDto } from '../models/responses/children.response.dto';
import { CreateResponseDto } from '../models/responses/create.response.dto';
import { PageResponseDto } from '../models/responses/page.response.dto';
import { UpdateResponseDto } from '../models/responses/update.response.dto';

@Injectable({
  providedIn: 'root'
})
export class ChildrenService {
  private baseUrl: string = 'http://localhost:8080/api/v1/children';

  constructor(
    private http: HttpClient,
  ) { }

  getAll(page: number, pageSize: number): Observable<PageResponseDto<ChildrenResponseDto>> {
    const params = new HttpParams()
      .set('page', page)
      .set('pageSize', pageSize);

    return this.http.get<PageResponseDto<ChildrenResponseDto>>(`${this.baseUrl}`, { params });
  }

  applyVaccine(id: string): Observable<void> {
    return this.http.get<void>(`${this.baseUrl}/apply/${id}`);
  }

  create(createChildrenDto: CreateChildrenRequestDto): Observable<CreateResponseDto> {
    return this.http.post<CreateResponseDto>(`${this.baseUrl}/create`, createChildrenDto);
  }

  update(id: string, updateChildrenDto: UpdateChildrenRequestDto): Observable<UpdateResponseDto> {
    return this.http.put<UpdateResponseDto>(`${this.baseUrl}/update/${id}`, updateChildrenDto);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }
}
