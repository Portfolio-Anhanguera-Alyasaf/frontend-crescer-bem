import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateVaccineRequestDto } from '../models/requests/create-vaccine.request.dto';
import { UpdateVaccineRequestDto } from '../models/requests/update-vaccine.request.dto';
import { CreateResponseDto } from '../models/responses/create.response.dto';
import { PageResponseDto } from '../models/responses/page.response.dto';
import { UpdateResponseDto } from '../models/responses/update.response.dto';
import { VaccineResponseDto } from '../models/responses/vaccine.response.dto';

@Injectable({
  providedIn: 'root'
})
export class VaccineService {
  private baseUrl: string = 'http://localhost:8080/api/v1/vaccines';

  constructor(
    private http: HttpClient,
  ) { }

  getAll(page: number, pageSize: number): Observable<PageResponseDto<VaccineResponseDto>> {
    const params = new HttpParams()
      .set('page', page)
      .set('pageSize', pageSize);

    return this.http.get<PageResponseDto<VaccineResponseDto>>(`${this.baseUrl}`, { params });
  }

  create(createVaccineDto: CreateVaccineRequestDto): Observable<CreateResponseDto> {
    return this.http.post<CreateResponseDto>(`${this.baseUrl}/create`, createVaccineDto);
  }

  update(id: string, updateVaccineDto: UpdateVaccineRequestDto): Observable<UpdateResponseDto> {
    return this.http.put<CreateResponseDto>(`${this.baseUrl}/update/${id}`, updateVaccineDto);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }
}
