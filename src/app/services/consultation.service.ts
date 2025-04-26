import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateConsultationRequestDto } from '../models/requests/create-consultation.request.dto';
import { UpdateConsultationRequestDto } from '../models/requests/update-consultation.request.dto';
import { ConsultationResponseDto } from '../models/responses/consultation.response.dto';
import { CreateResponseDto } from '../models/responses/create.response.dto';
import { PageResponseDto } from '../models/responses/page.response.dto';
import { UpdateResponseDto } from '../models/responses/update.response.dto';

@Injectable({
  providedIn: 'root'
})
export class ConsultationService {
  private baseUrl: string = 'http://localhost:8080/api/v1/consultations';

  constructor(
    private http: HttpClient,
  ) { }

  getAll(page: number, pageSize: number): Observable<PageResponseDto<ConsultationResponseDto>> {
    const params = new HttpParams()
      .set('page', page)
      .set('pageSize', pageSize);

    return this.http.get<PageResponseDto<ConsultationResponseDto>>(`${this.baseUrl}`, { params });
  }

  create(createConsultationDto: CreateConsultationRequestDto): Observable<CreateResponseDto> {
    return this.http.post<CreateResponseDto>(`${this.baseUrl}/create`, createConsultationDto);
  }

  update(id: string, updateConsultationDto: UpdateConsultationRequestDto): Observable<UpdateResponseDto> {
    return this.http.put<CreateResponseDto>(`${this.baseUrl}/update/${id}`, updateConsultationDto);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }
}
