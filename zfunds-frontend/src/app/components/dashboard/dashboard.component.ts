import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService, DashboardStats } from '../../services/dashboard.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  stats: DashboardStats | null = null;
  isLoading = true;
  error: string = '';

  constructor(
    private dashboardService: DashboardService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Check if user is admin
    const userRole = this.authService.getUserRole();
    if (userRole !== 'admin') {
      this.router.navigate(['/profile']);
      return;
    }

    this.loadDashboardStats();
  }

  loadDashboardStats(): void {
    this.isLoading = true;
    this.error = '';

    this.dashboardService.getDashboardStats().subscribe({
      next: (stats) => {
        this.stats = stats;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading dashboard stats:', err);
        this.error = 'Failed to load dashboard statistics';
        this.isLoading = false;
        if (err.status === 403) {
          this.router.navigate(['/profile']);
        }
      }
    });
  }
}
