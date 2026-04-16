import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email: string = '';
  password: string = '';
  showPassword: boolean = false;

  constructor(private http: HttpClient, private auth: AuthService,private router: Router) { }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  // 🔐 NORMAL LOGIN
  login() {
    const body = {
      email: this.email,
      password: this.password
    };

    this.auth.login(body).subscribe({
      next: (res) => {
        this.auth.setToken(res.token);
        alert('Login successful ✅');
        this.router.navigate(['/']); 
      },
      error: () => {
        alert('Login failed ❌');
      }
    });
  }

  // 🌐 GOOGLE LOGIN (UI only for now)
  loginWithGoogle() {
    alert('Google login integration next step 🚀');
  }
}