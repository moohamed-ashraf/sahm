import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InvestmentService {
  private apiUrl = `${environment.apiUrl}/investments`;

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('userToken');
    return new HttpHeaders().set('Authorization', `Bearer ${token || ''}`);
  }

  // Create a new investment
  createInvestment(investmentData: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post(this.apiUrl, investmentData, { headers });
  }

  // Get all investments
  getInvestments(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(this.apiUrl, { headers });
  }

  // Get investment by ID
  getInvestmentById(id: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(`${this.apiUrl}/${id}`, { headers });
  }

  // Get investments by user ID
  getInvestmentsByUserId(userId: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(`${this.apiUrl}/user/${userId}`, { headers });
  }

  // Get investments by company ID
  getInvestmentsByCompanyId(companyId: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(`${this.apiUrl}/company/${companyId}`, { headers });
  }

  // Update project raised amount after investment
  updateProjectRaisedAmount(projectId: number, amount: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.put(`${environment.apiUrl}/projects/${projectId}/raised-amount`, { amount }, { headers });
  }
} 