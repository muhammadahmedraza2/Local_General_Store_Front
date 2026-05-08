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
  ) { }

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


// saveUser(res: any) {
//   if (res.token) {
//     localStorage.setItem('token', res.token);
//   }

//   const userData = res.user || res;

//   const user = {
//     userId: userData.id || userData.userId,
//     name: userData.name,
//     email: userData.email,
//     role: userData.role,
//     imageUrl: userData.imageUrl || null
//   };

//   localStorage.setItem('user', JSON.stringify(user));
  
//   // ✅ userId alag se bhi save karo
//   localStorage.setItem('userId', String(userData.id || userData.userId || ''));
// }

saveUser(res: any) {
  if (res.token) {
    localStorage.setItem('token', res.token);
  }

  const userData = res.user || res;

  const user = {
    userId:      userData.id          || userData.userId,
    name:        userData.name,
    email:       userData.email,
    role:        userData.role,
    phone:       userData.phone       || '',   // ✅ add karo
    gender:      userData.gender      || '',   // ✅ add karo
    dateOfBirth: userData.dateOfBirth || '',   // ✅ add karo
    storeName:   userData.storeName   || '',   // ✅ add karo
    storeLogo:   userData.storeLogo   || null, // ✅ add karo
    profileImage: userData.profileImage || userData.imageUrl || null // ✅ add karo
  };

  localStorage.setItem('user', JSON.stringify(user));
  localStorage.setItem('userId', String(userData.id || userData.userId || ''));
}


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