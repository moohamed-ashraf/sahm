import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { InvestmentService } from '../../services/investment.service';
import { AuthService } from '../../services/auth.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-investment',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './investment.component.html',
  styleUrls: ['./investment.component.css'],
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('0.5s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('progressAnimation', [
      transition(':enter', [
        style({ width: '0' }),
        animate('1s ease-in-out', style({ width: '*' }))
      ])
    ])
  ]
})
export class InvestmentComponent implements OnInit {
  investments: any[] = [];
  isLoadingInvestments: boolean = false;
  errorMessage: string = '';
  user_id: number = 0;
  token: string = '';

  constructor(
    private investmentService: InvestmentService,
    private authService: AuthService,
    private router: Router
  ) {
    this.token = localStorage.getItem('userToken') || '';

    if (!this.token) {
      this.errorMessage = 'Session expired. Please log in again.';
      this.router.navigate(['/login']);
      return;
    }

    const decodedToken: any = jwtDecode(this.token);
    this.user_id = decodedToken.id;
  }

  ngOnInit(): void {
    this.loadInvestorData();
  }

  loadInvestorData() {
    this.isLoadingInvestments = true;
    this.investmentService.getInvestmentsByUserId(this.user_id).subscribe({
      next: (investments) => {
        // Group investments by project_id and sum investment_amount
        const grouped: { [projectId: number]: any } = {};
        investments.forEach((inv: any) => {
          if (!grouped[inv.project_id]) {
            grouped[inv.project_id] = { ...inv };
          } else {
            grouped[inv.project_id].investment_amount = Number(grouped[inv.project_id].investment_amount) + Number(inv.investment_amount);
          }
        });
        this.investments = Object.values(grouped);
        this.isLoadingInvestments = false;
        console.log(this.investments);
      },
      error: (err) => {
        console.error('Error loading investments:', err);
        this.errorMessage = 'Error loading investment data';
        this.isLoadingInvestments = false;
      }
    });
  }
}
