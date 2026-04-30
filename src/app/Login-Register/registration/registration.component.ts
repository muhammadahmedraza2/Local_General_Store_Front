import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

  name: string = '';
  email: string = '';
  password: string = '';
  phone: string = '';
  dateOfBirth: string = '';
  gender: string = '';

  showPassword: boolean = false;

  selectedFile: File | null = null;

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  register() {

    // ======================
    // BASIC VALIDATION (IMPORTANT)
    // ======================
    if (!this.name || !this.email || !this.password) {
      alert('Name, Email, Password required');
      return;
    }

    const formData = new FormData();

    formData.append('name', this.name.trim());
    formData.append('email', this.email.trim());
    formData.append('password', this.password);
    formData.append('phone', this.phone || '');
    formData.append('dateOfBirth', this.dateOfBirth || '');
    formData.append('gender', this.gender || '');

    if (this.selectedFile) {
      formData.append('profileImage', this.selectedFile);
    }

    this.auth.register(formData).subscribe({
      next: (res) => {
        console.log(res);
        this.auth.saveUser(res); // ✅ YEH ADD KARO — user save hoga
        alert('Registered Successfully');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.log('API ERROR:', err);
        alert(err.error || 'Registration Failed');
      }
    });
  }
}