import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NgIf } from '@angular/common';
import { RecaptchaService } from '../../services/recaptcha.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterModule, NgIf],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, AfterViewInit {
  user_name = '';
  user_email = '';
  password = '';
  user_role = '';
  error: string = '';
  captchaToken: string = '';
  captchaWidgetId: number = 0;
  @ViewChild('captchaContainer', { static: false }) captchaContainer!: ElementRef;

  constructor(
    private authService: AuthService,
    private router: Router,
    private recaptchaService: RecaptchaService
  ) {}

  ngOnInit(): void {
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
          this.error = '';
        },
        () => {
          this.error = 'reCAPTCHA failed to load. Please refresh the page.';
        }
      );
    } else if (!this.recaptchaService.isScriptLoaded()) {
      setTimeout(() => this.loadCaptcha(), 200);
    }
  }

  register() {
    if (!this.captchaToken) {
      this.error = 'Please complete the reCAPTCHA verification';
      return;
    }

    this.error = '';
    this.authService.register(this.user_name, this.user_email, this.password, this.user_role, this.captchaToken).subscribe({
      next: (res) => {
        console.log('Registration success', res);
        // Reset captcha
        if (this.captchaWidgetId) {
          this.recaptchaService.reset(this.captchaWidgetId);
          this.captchaToken = '';
        }
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Registration failed', err);
        // Reset captcha on error
        if (this.captchaWidgetId) {
          this.recaptchaService.reset(this.captchaWidgetId);
          this.captchaToken = '';
        }
        if (err.error && err.error.message) {
          this.error = err.error.message;
        } else {
          this.error = 'Registration failed. Please try again.';
        }
      }
    });
  }
}
