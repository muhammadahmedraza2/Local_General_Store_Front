import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private api = 'http://localhost:5000/api/Auth';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  // ==========================
  // LOGIN
  // ==========================
  login(data: any) {
    return this.http.post<any>(`${this.api}/login`, data);
  }

  // ==========================
  // REGISTER
  // ==========================
  register(data: any) {
    return this.http.post<any>(`${this.api}/register`, data);
  }

  // ==========================
  // GOOGLE LOGIN
  // ==========================
  googleLogin(token: string) {
    return this.http.post<any>(`${this.api}/google-login`, {
      token: token
    });
  }

  // ==========================
  // UPDATE PROFILE API (NEW)
  // ==========================
  updateProfile(data: any) {
    return this.http.put<any>(`${this.api}/update-profile`, data);
  }


  // ==========================
  // SAVE USER (IMPORTANT)
  // ==========================
  saveUser(res: any) {
    localStorage.setItem('token', res.token);
    localStorage.setItem('userId', res.userId);
    localStorage.setItem('name', res.name);
    localStorage.setItem('email', res.email);

    // ✅ ROLE SAVE
    localStorage.setItem('role', res.role);
  }

  // ==========================
  // GET TOKEN
  // ==========================
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // ==========================
  // CHECK LOGIN
  // ==========================
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  // ==========================
  // GET USER DATA
  // ==========================
  getUserId(): string | null {
    return localStorage.getItem('userId');
  }

  getUserName(): string | null {
    return localStorage.getItem('name');
  }

  getEmail(): string | null {
    return localStorage.getItem('email');
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }

  // ==========================
  // GET FULL PROFILE
  // ==========================
  getProfile() {
    return {
      userId: this.getUserId(),
      name: this.getUserName(),
      email: this.getEmail(),
      role: this.getRole()
    };
  }

  // ==========================
  // LOGOUT
  // ==========================
  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}