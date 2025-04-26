import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AuthRequestDto } from '../../models/requests/auth.request.dto';
import { AuthResponseDto } from '../../models/responses/auth.response.dto';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [AuthService],
})
export class LoginComponent implements OnInit {
  formBuilder: FormBuilder = inject(FormBuilder);
  authService: AuthService = inject(AuthService);
  form!: FormGroup;

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
      password: ['', Validators.required],
    });
  }

  onLogin(): void {
    const credentials = <AuthRequestDto>{
      email: this.form.get('email')?.value,
      password: this.form.get('password')?.value,
    };

    console.log(credentials);
    this.authService.login(credentials).subscribe({
      next: (value: AuthResponseDto) => {
        console.log(value)
        localStorage.setItem('token', value.token);
        localStorage.setItem('refreshToken', value.refreshToken);
      },
      error: () => console.error(),
    });
  }
}
