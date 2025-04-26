import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MAT_DIALOG_DATA,
  MatDialogRef
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UpdateChildrenRequestDto } from '../../../models/requests/update-children.request.dto';
import { ChildrenResponseDto } from '../../../models/responses/children.response.dto';
import { ChildrenService } from '../../../services/children.service';

@Component({
  selector: 'app-update-children',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatDatepickerModule, MatInputModule, MatButtonModule],
  templateUrl: './update-children.component.html',
  styleUrl: './update-children.component.scss'
})
export class UpdateChildrenComponent implements OnInit {
  childrenService: ChildrenService = inject(ChildrenService);
  formBuilder: FormBuilder = inject(FormBuilder);
  form!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<UpdateChildrenComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ChildrenResponseDto,
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.form = this.formBuilder.group({
      name: [this.data.name, Validators.required],
      birthday: [this.data.birthday, Validators.required],
      weight: [this.data.weight, Validators.required],
      height: [this.data.height, Validators.required],
    });
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onUpdate(): void {
    const childrenUpdated = <UpdateChildrenRequestDto>{
      name: this.form.get('name')?.value,
      birthday: this.form.get('birthday')?.value,
      weight: this.form.get('weight')?.value,
      height: this.form.get('height')?.value,
    }

    this.childrenService.update(this.data.id, childrenUpdated).subscribe({
      next: (value) => {
        if (value) {
          this.dialogRef.close();
        }
      },
      error: (err) => console.error(err),
    });
  }
}
