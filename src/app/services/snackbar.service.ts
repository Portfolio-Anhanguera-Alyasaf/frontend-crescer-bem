import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../modules/snackbar/snackbar.component';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  constructor(private snackBar: MatSnackBar) { }

  show(message: string, type: 'success' | 'error' | 'info' | 'warning') {
    this.snackBar.openFromComponent(SnackbarComponent, {
      data: { message, type },
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['no-padding']
    });
  }
}
