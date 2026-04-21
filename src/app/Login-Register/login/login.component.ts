import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/services/auth.service';
import { Router } from '@angular/router';

declare var google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email = '';
  password = '';
  showPassword = false;

  private googleInitialized = false;

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initGoogle();
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  login() {
    const body = {
      email: this.email,
      password: this.password
    };

    this.auth.login(body).subscribe({
      next: (res) => {
        this.auth.saveUser(res);
        alert('Login successful ✅');
        this.router.navigate(['/']);
      },
      error: () => alert('Login failed ❌')
    });
  }

  // ✅ INIT ONLY ONCE
  private initGoogle() {
    if (this.googleInitialized) return;

    google.accounts.id.initialize({
      client_id: '437392906208-qdrn7doutvvsmieavh2e0q96jnpqr4kg.apps.googleusercontent.com',
      callback: (response: any) => {
        this.handleGoogleLogin(response);
      }
    });

    this.googleInitialized = true;
  }

  // ✅ BUTTON CLICK ONLY
  loginWithGoogle() {
    google.accounts.id.prompt();
  }

  // ✅ HANDLE TOKEN
  private handleGoogleLogin(response: any) {
    console.log('Google Credential:', response.credential);

    this.auth.googleLogin(response.credential).subscribe({
      next: (res: any) => {
        this.auth.saveUser(res);
        alert('Google Login Success ✅');
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.log(err);
        alert('Google Login Failed ❌');
      }
    });
  }
}