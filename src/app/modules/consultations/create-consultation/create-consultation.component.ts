import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CreateConsultationRequestDto } from '../../../models/requests/create-consultation.request.dto';
import { ConsultationService } from '../../../services/consultation.service';

@Component({
  selector: 'app-create-consultation',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatDatepickerModule],
  templateUrl: './create-consultation.component.html',
  styleUrl: './create-consultation.component.scss'
})
export class CreateConsultationComponent {
  consultationService: ConsultationService = inject(ConsultationService);

  formBuilder: FormBuilder = inject(FormBuilder);
  form!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<CreateConsultationComponent>,
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.form = this.formBuilder.group({
      doctorName: ['', Validators.required],
      hospitalName: ['', Validators.required],
      dateConsult: ['', Validators.required],
    });
  }

  onCreate(): void {
    const newConsultation = <CreateConsultationRequestDto>{
      doctorName: this.form.get('doctorName')?.value,
      hospitalName: this.form.get('hospitalName')?.value,
      dateConsult: this.form.get('dateConsult')?.value,
    }

    this.consultationService.create(newConsultation).subscribe({
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
