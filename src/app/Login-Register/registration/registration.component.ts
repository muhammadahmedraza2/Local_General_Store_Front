import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

  name = '';
  email = '';
  password = '';
  showPassword = false;

  constructor(private auth: AuthService, private router: Router) {}

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  register() {

    const body = {
      name: this.name,
      email: this.email,
      password: this.password
    };

    this.auth.register(body).subscribe({
      next: () => {
        alert('Registered successfully ✅');
        this.router.navigate(['/login']);
      },
      error: () => {
        alert('Registration failed ❌');
      }
    });
  }
}