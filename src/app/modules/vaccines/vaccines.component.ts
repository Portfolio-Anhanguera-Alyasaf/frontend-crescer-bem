import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { VaccineResponseDto } from '../../models/responses/vaccine.response.dto';
import { VaccineService } from '../../services/vaccine.service';

@Component({
  selector: 'app-vaccines',
  standalone: true,
  imports: [MatTableModule, MatIconModule, MatPaginatorModule, MatCardModule],
  templateUrl: './vaccines.component.html',
  styleUrl: './vaccines.component.scss'
})
export class VaccinesComponent implements OnInit {
  vaccineService: VaccineService = inject(VaccineService);

  displayedColumns: string[] = ['name', 'description'];

  vaccines: Array<VaccineResponseDto> = [];

  page: number = 0;
  pageSize: number = 10;
  totalElements: number = 0;

  ngOnInit(): void {
    this.getAllVaccines();
  }

  loadPage(event: PageEvent): void {
    this.page = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getAllVaccines();
  }

  getAllVaccines(): void {
    this.vaccineService.getAll(this.page, this.pageSize).subscribe({
      next: (value) => {
        if (value) {
          this.vaccines = value.data;
          this.page = value.pagination.page;
          this.pageSize = value.pagination.pageSize;
          this.totalElements = value.pagination.totalElements;
        }
      },
      error: (err) => console.error(err),
    });
  }
}
