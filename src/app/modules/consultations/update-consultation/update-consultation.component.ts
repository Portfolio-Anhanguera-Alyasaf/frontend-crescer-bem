import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UpdateConsultationRequestDto } from '../../../models/requests/update-consultation.request.dto';
import { ConsultationResponseDto } from '../../../models/responses/consultation.response.dto';
import { ConsultationService } from '../../../services/consultation.service';

@Component({
  selector: 'app-update-consultation',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatDatepickerModule],
  templateUrl: './update-consultation.component.html',
  styleUrl: './update-consultation.component.scss'
})
export class UpdateConsultationComponent {
  consultationService: ConsultationService = inject(ConsultationService);

  formBuilder: FormBuilder = inject(FormBuilder);
  form!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<UpdateConsultationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConsultationResponseDto,
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.form = this.formBuilder.group({
      doctorName: [this.data.doctorName, Validators.required],
      hospitalName: [this.data.hospitalName, Validators.required],
      dateConsult: [this.data.dateConsult, Validators.required],
    });
  }

  onUpdate(): void {
    const newConsultation = <UpdateConsultationRequestDto>{
      doctorName: this.form.get('doctorName')?.value,
      hospitalName: this.form.get('hospitalName')?.value,
      dateConsult: this.form.get('dateConsult')?.value,
    }

    this.consultationService.update(this.data.id, newConsultation).subscribe({
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
}
