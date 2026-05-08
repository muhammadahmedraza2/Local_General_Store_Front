import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/services/auth.service';
import { Router } from '@angular/router';

declare var google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form!: FormGroup;
  showPassword = false;
  googleInitialized = false;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.initGoogleLogin();
  }

  initForm() {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  // LOGIN
  login() {

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.auth.login(this.form.value).subscribe({
      next: (res: any) => {
        this.auth.saveUser(res);
        this.router.navigate(['/']);
      },
      error: () => alert('Login Failed')
    });
  }

  // GOOGLE LOGIN
  initGoogleLogin() {

    if (this.googleInitialized) return;

    google.accounts.id.initialize({
      client_id: '437392906208-qdrn7doutvvsmieavh2e0q96jnpqr4kg.apps.googleusercontent.com',
      callback: (response: any) => this.handleGoogleResponse(response),
      auto_select: true
    });

    this.googleInitialized = true;
  }

  loginWithGoogle() {
    google.accounts.id.prompt();
  }

  handleGoogleResponse(response: any) {
    this.auth.googleLogin(response.credential).subscribe({
      next: (res: any) => {
        this.auth.saveUser(res);
        this.router.navigate(['/']);
      },
      error: () => alert('Google Login Failed')
    });
  }
}