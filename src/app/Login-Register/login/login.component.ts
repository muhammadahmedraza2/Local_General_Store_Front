import { Component, OnInit } from '@angular/core';
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
  googleInitialized = false;

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initGoogleLogin();
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  // NORMAL LOGIN
  login() {
    const body = {
      email: this.email,
      password: this.password
    };

    this.auth.login(body).subscribe({
      next: (res: any) => {
        this.auth.saveUser(res);
        this.router.navigate(['/']);
      },
      error: () => alert('Login Failed')
    });
  }

  // GOOGLE INIT
  initGoogleLogin() {

    if (this.googleInitialized) return;

    google.accounts.id.initialize({
      client_id: '437392906208-qdrn7doutvvsmieavh2e0q96jnpqr4kg.apps.googleusercontent.com',
      callback: (response: any) => {
        this.handleGoogleResponse(response);
      },
      auto_select: true,
      cancel_on_tap_outside: false
    });

    this.googleInitialized = true;
  }

  // BUTTON CLICK
  loginWithGoogle() {
    google.accounts.id.prompt();
  }

  // TOKEN HANDLE
  handleGoogleResponse(response: any) {

    this.auth.googleLogin(response.credential).subscribe({
      next: (res: any) => {
        this.auth.saveUser(res);
        this.router.navigate(['/']);
      },
      error: () => {
        alert('Google Login Failed');
      }
    });

  }

}