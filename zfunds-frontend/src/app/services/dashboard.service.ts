import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface DashboardStats {
  totalUsers: number;
  totalCompanies: number;
  totalProjects: number;
  totalInvestments: number;
  totalRevenue: number;
  activeProjects: number;
  completedProjects: number;
  totalInvestors: number;
  totalEntrepreneurs: number;
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = environment.apiUrl;
  private token: string = '';

  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('userToken') || '';
  }

  getDashboardStats(): Observable<DashboardStats> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.get<DashboardStats>(`${this.apiUrl}/dashboard/stats`, { headers });
  }
}

