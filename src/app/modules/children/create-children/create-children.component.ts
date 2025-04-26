import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MatDialogRef
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CreateChildrenRequestDto } from '../../../models/requests/create-children.request.dto';
import { ConsultationResponseDto } from '../../../models/responses/consultation.response.dto';
import { VaccineResponseDto } from '../../../models/responses/vaccine.response.dto';
import { ChildrenService } from '../../../services/children.service';
import { ConsultationService } from '../../../services/consultation.service';
import { VaccineService } from '../../../services/vaccine.service';

@Component({
  selector: 'app-create-children',
  standalone: true,
  imports: [FormsModule,
    MatSelectModule,
    MatOptionModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule],
  templateUrl: './create-children.component.html',
  styleUrl: './create-children.component.scss'
})
export class CreateChildrenComponent implements OnInit {
  childrenService: ChildrenService = inject(ChildrenService);
  consultationService: ConsultationService = inject(ConsultationService);
  vaccineService: VaccineService = inject(VaccineService);

  formBuilder: FormBuilder = inject(FormBuilder);
  form!: FormGroup;

  vaccines: Array<VaccineResponseDto> = [];
  consultations: Array<ConsultationResponseDto> = [];

  pageVaccine: number = 0;
  pageSizeVaccine: number = 10;

  pageConsultation: number = 0;
  pageSizeConsultation: number = 10;

  constructor(
    public dialogRef: MatDialogRef<CreateChildrenComponent>,
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.getAllConsultations();
    this.getAllVaccines();
  }

  createForm(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      birthday: ['', Validators.required],
      weight: ['', Validators.required],
      height: ['', Validators.required],
      consultationsId: [[], Validators.required],
      vaccinesId: [[], Validators.required],
    });
  }

  onCreate(): void {
    const newChildren = <CreateChildrenRequestDto>{
      name: this.form.get('name')?.value,
      birthday: this.form.get('birthday')?.value,
      weight: this.form.get('weight')?.value,
      height: this.form.get('height')?.value,
      consultationsId: this.form.get('consultationsId')?.value,
      vaccinesId: this.form.get('vaccinesId')?.value,
    }

    this.childrenService.create(newChildren).subscribe({
      next: (value) => {
        if (value) {
          this.dialogRef.close();
        }
      },
      error: (err) => console.error(err),
    });
  }

  onClose(): void {
    this.dialogRef.close();
  }

  getAllConsultations(): void {
    this.consultationService.getAll(this.pageConsultation, this.pageSizeConsultation).subscribe({
      next: (value) => {
        if (value) {
          if (value.pagination.page > 0) {
            this.consultations = [...this.consultations, ...value.data];
            console.log(this.consultations);
          }

          this.consultations = value.data;
          this.pageConsultation = value.pagination.page;
          this.pageSizeConsultation = value.pagination.pageSize;
        }
      },
      error: (err) => console.error(err),
    });
  }

  loadMoreConsultations(): void {
    this.pageConsultation = this.pageConsultation + 1;
    this.getAllConsultations();
  }

  getAllVaccines(): void {
    this.vaccineService.getAll(this.pageVaccine, this.pageSizeVaccine).subscribe({
      next: (value) => {
        if (value) {
          if (value.pagination.page > 0) {
            this.vaccines = [...this.vaccines, ...value.data];
          }

          this.vaccines = value.data;
          this.pageVaccine = value.pagination.page;
          this.pageSizeVaccine = value.pagination.pageSize;
        }
      },
      error: (err) => console.error(err),
    });
  }

  loadMoreVaccines(): void {
    this.pageVaccine = this.pageVaccine + 1;
    this.getAllVaccines();
  }
}
