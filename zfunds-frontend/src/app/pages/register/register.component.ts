import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterModule, NgIf],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user_name = '';
  user_email = '';
  password = '';
  user_role = '';
  error: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  register() {
    this.error = '';
    this.authService.register(this.user_name, this.user_email, this.password, this.user_role).subscribe({
      next: (res) => {
        console.log('Registration success', res);
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Registration failed', err);
        this.error = 'Registration failed. Please try again.';
      }
    });
  }
}
