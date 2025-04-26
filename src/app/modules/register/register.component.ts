import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { Kind } from '../../models/enums/kind.enum';
import { CreateUserRequestDto } from '../../models/requests/create-user.request.dto';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatSelectModule, MatOptionModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  formBuilder: FormBuilder = inject(FormBuilder);
  userService: UserService = inject(UserService);
  router: Router = inject(Router);
  form!: FormGroup;

  mom: Kind = Kind.MOM;
  dad: Kind = Kind.DAD;

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
      password: ['', Validators.required],
      name: ['', Validators.required],
      childrenNumber: [0, Validators.required],
      kind: [Kind.MOM]
    });
  }

  onRegister(): void {
    const newUser = <CreateUserRequestDto>{
      email: this.form.get('email')?.value,
      password: this.form.get('password')?.value,
      name: this.form.get('name')?.value,
      childrenNumber: this.form.get('childrenNumber')?.value,
      kind: this.form.get('kind')?.value,
    }

    this.userService.create(newUser).subscribe({
      next: (value) => {
        if (value) {
          this.router.navigate(['/login']);
        }
      },
      error: (err) => console.error(err),
    });
  }

}
