import { DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { ConsultationResponseDto } from '../../models/responses/consultation.response.dto';
import { ConsultationService } from '../../services/consultation.service';
import { SnackbarService } from '../../services/snackbar.service';
import { CreateConsultationComponent } from './create-consultation/create-consultation.component';
import { UpdateConsultationComponent } from './update-consultation/update-consultation.component';

@Component({
  selector: 'app-consultations',
  standalone: true,
  imports: [MatIconModule, MatCardModule, MatTableModule, MatPaginatorModule, MatButtonModule, DatePipe],
  templateUrl: './consultations.component.html',
  styleUrl: './consultations.component.scss'
})
export class ConsultationsComponent implements OnInit {
  consultationService: ConsultationService = inject(ConsultationService);
  snackbarService: SnackbarService = inject(SnackbarService);

  displayedColumns: string[] = ['doctorName', 'hospitalName', 'dateConsult', 'actions'];

  consultations: Array<ConsultationResponseDto> = [];

  page: number = 0;
  pageSize: number = 10;
  totalElements: number = 0;

  constructor(
    private dialog: MatDialog,
    private dialogUpdate: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getAllConsultations();
  }

  openRegisterModal() {
    const dialogRef = this.dialog.open(CreateConsultationComponent, {
      width: '700px',
      height: '500px'
    });

    dialogRef.afterClosed().subscribe({
      next: () => {
        this.snackbarService.show("Adicionado com sucesso!", "success");
        this.getAllConsultations();
      },
      error: (err) => this.snackbarService.show("Ops! Ocorreu um erro!", "error"),
    });
  }

  getAllConsultations(): void {
    this.consultationService.getAll(this.page, this.pageSize).subscribe({
      next: (value) => {
        if (value) {
          this.consultations = value.data;
          this.page = value.pagination.page;
          this.pageSize = value.pagination.pageSize;
          this.totalElements = value.pagination.totalElements;
        }
      },
      error: (err) => console.error(err),
    });
  }

  loadPage(event: PageEvent): void {
    this.page = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getAllConsultations();
  }

  editConsultation(consultation: ConsultationResponseDto): void {
    const dialogRef = this.dialogUpdate.open(UpdateConsultationComponent, {
      width: '700px',
      height: '500px',
      data: consultation,
    });

    dialogRef.afterClosed().subscribe({
      next: () => {
        this.snackbarService.show("Editado com sucesso!", "success");
        this.getAllConsultations();
      },
      error: (err) => this.snackbarService.show("Ops! Ocorreu um erro!", "error"),
    });
  }

  deleteConsultation(id: string): void {
    this.consultationService.delete(id).subscribe({
      next: () => {
        this.snackbarService.show("Deletado com sucesso!", "success");
        this.getAllConsultations();
      },
      error: (err) => this.snackbarService.show("Ops! Ocorreu um erro!", "error"),
    })
  }
}
