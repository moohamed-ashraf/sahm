import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { jwtDecode } from "jwt-decode";
import { RecaptchaService } from '../../services/recaptcha.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    RouterModule,
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {
  user_email = '';
  password = '';
  captchaToken: string = '';
  captchaWidgetId: number = 0;
  captchaError: string = '';
  @ViewChild('captchaContainer', { static: false }) captchaContainer!: ElementRef;

  constructor(
    private authService: AuthService, 
    private router: Router,
    private recaptchaService: RecaptchaService
  ) {}

  ngOnInit(): void {
    // Wait a bit for the script to load
    setTimeout(() => {
      this.loadCaptcha();
    }, 500);
  }

  ngAfterViewInit(): void {
    this.loadCaptcha();
  }

  loadCaptcha(): void {
    if (this.captchaContainer && this.recaptchaService.isScriptLoaded()) {
      this.captchaWidgetId = this.recaptchaService.render(
        this.captchaContainer.nativeElement,
        (token: string) => {
          this.captchaToken = token;
          this.captchaError = '';
        },
        () => {
          this.captchaError = 'reCAPTCHA failed to load. Please refresh the page.';
        }
      );
    } else if (!this.recaptchaService.isScriptLoaded()) {
      // Retry after a short delay
      setTimeout(() => this.loadCaptcha(), 200);
    }
  }

  login() {
    if (!this.captchaToken) {
      this.captchaError = 'Please complete the reCAPTCHA verification';
      return;
    }

    this.captchaError = '';
    this.authService.login(this.user_email, this.password, this.captchaToken).subscribe({
      next: (res) => {
        console.log('Login success', res);
        // Save JWT token
        localStorage.setItem('userToken', res.token);
        
        // Decode token to get user info
        const decodedToken: any = jwtDecode(res.token);
        localStorage.setItem('userRole', decodedToken.user_role);
        
        this.authService.setLoggedIn(true);
        
        // Reset captcha
        if (this.captchaWidgetId) {
          this.recaptchaService.reset(this.captchaWidgetId);
          this.captchaToken = '';
        }
        
        // Navigate based on user role
        if (decodedToken.user_role === 'admin') {
          this.router.navigate(['/dashboard']);
        } else if (decodedToken.user_role === 'investor') {
          this.router.navigate(['/projects']);
        } else if (decodedToken.user_role === 'entrepreneur') {
          this.router.navigate(['/companies']);
        } else {
          this.router.navigate(['/profile']);
        }
      },
      error: (err) => {
        console.error('Login failed', err);
        // Reset captcha on error
        if (this.captchaWidgetId) {
          this.recaptchaService.reset(this.captchaWidgetId);
          this.captchaToken = '';
        }
        if (err.error && err.error.message) {
          this.captchaError = err.error.message;
        } else {
          this.captchaError = 'Login failed. Please try again.';
        }
      }
    });
  }
}