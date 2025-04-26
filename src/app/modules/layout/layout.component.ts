import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [MatIconModule, CommonModule, RouterModule, MatButtonModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  authService: AuthService = inject(AuthService);

  sidebarCollapsed = signal(false);

  toggleSidebar() {
    this.sidebarCollapsed.update((collapsed) => !collapsed);
  }

  logoutSystem(): void {
    this.authService.logout();
  }
}
