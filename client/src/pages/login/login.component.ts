import { Component } from '@angular/core';
import { AuthService } from '../../services/auth-service/auth.service';
import { Router } from '@angular/router';
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardTitle,
} from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    FormsModule,
    MatCardContent,
    MatLabel,
    MatFormField,
    MatInput,
    MatButton,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string = ''; // Initialize username as an empty string
  password: string = ''; // Initialize password as an empty string

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  login(): void {
    const user = { username: this.username, password: this.password };
    this.authService.login(user).subscribe(
      (response) => {
        console.log('Login successful:', response);
        localStorage.setItem('authToken', response.token);
        localStorage.setItem('username', this.username); // Store the username in localStorage
        this.router.navigate(['/']); // Redirect to the profile page
      },
      (error) => {
        console.error('Login failed:', error);
        // Handle error
      },
    );
  }
}
