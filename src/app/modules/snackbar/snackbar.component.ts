import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snackbar',
  standalone: true,
  imports: [MatIconModule, CommonModule],
  templateUrl: './snackbar.component.html',
  styleUrl: './snackbar.component.scss'
})
export class SnackbarComponent {
  icon: string = '';

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: { message: string; type: 'success' | 'error' | 'info' | 'warning' }) {
    this.setIcon();
  }

  private setIcon() {
    switch (this.data.type) {
      case 'success':
        this.icon = 'check_circle';
        break;
      case 'error':
        this.icon = 'error';
        break;
      case 'info':
        this.icon = 'info';
        break;
      case 'warning':
        this.icon = 'warning';
        break;
    }
  }
}
