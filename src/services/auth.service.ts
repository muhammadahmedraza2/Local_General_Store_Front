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

  login(data: any) {
    return this.http.post<any>(`${this.api}/login`, data);
  }

  register(data: FormData) {
    return this.http.post<any>(`${this.api}/register`, data);
  }

  googleLogin(token: string) {
    return this.http.post<any>(`${this.api}/google-login`, { token });
  }

  updateProfile(data: any) {
    return this.http.put<any>(`${this.api}/update-profile`, data);
  }

  // ==========================
  // SAVE USER (IMPORTANT FIX)
  // ==========================
  saveUser(res: any) {
    localStorage.setItem('token', res.token);

    const user = {
      userId: res.userId,
      name: res.name,
      email: res.email,
      role: res.role,
      imageUrl: res.imageUrl || null
    };

    localStorage.setItem('user', JSON.stringify(user));
  }

  // ==========================
  // GET USER
  // ==========================
  getUser() {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}