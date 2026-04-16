import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private api = 'http://localhost:5000/api/Auth';

  constructor(private http: HttpClient, private router: Router) {}

  // 🔐 LOGIN
  login(data: any) {
    return this.http.post<any>(`${this.api}/login`, data);
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  // 📝 REGISTER
  register(data: any) {
    return this.http.post(`${this.api}/register`, data);
  }

  // 💾 SAVE TOKEN
  saveUser(res: any) {
    localStorage.setItem('token', res.token);
    localStorage.setItem('userId', res.userId);
  }

  // 🔍 CHECK LOGIN
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  // 🚪 LOGOUT
  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  // 👤 GET USER ID
  getUserId() {
    return localStorage.getItem('userId');
  }
}