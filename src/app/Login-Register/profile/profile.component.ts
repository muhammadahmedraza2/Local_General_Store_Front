import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {


  name: string = '';
  email: string = '';
  role: string = '';
  phoneNumber: string = '';
  dob: string = '';
  gender: string = 'Male';

  imageUrl: string =
    localStorage.getItem('image') ||
    'https://cdn-icons-png.flaticon.com/512/3135/3135715.png';

  constructor(private http: HttpClient, private auth: AuthService) {}

  // ==========================
  // LOAD DATA ON START
  // ==========================
  ngOnInit(): void {
    this.name = localStorage.getItem('name') || '';
    this.email = localStorage.getItem('email') || '';
    this.role = localStorage.getItem('role') || 'User';
  }

  // ==========================
  // IMAGE UPLOAD
  // ==========================
  onFileChange(event: any) {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        this.imageUrl = reader.result as string;
        localStorage.setItem('image', this.imageUrl);
      };

      reader.readAsDataURL(file);
    }
  }

  // ==========================
  // SAVE PROFILE (API CALL)
  // ==========================
  saveProfile() {

    const payload = {
      name: this.name,
      email: this.email,
      role: this.role,
      phoneNumber: this.phoneNumber,
      dateOfBirth: this.dob,
      gender: this.gender,
      imageUrl: this.imageUrl
    };

    console.log('Sending Payload:', payload);

    this.auth.updateProfile(payload)
  .subscribe({
    next: (res: any) => {
      console.log('Profile updated successfully', res);

      // update localStorage
      localStorage.setItem('name', this.name);
      localStorage.setItem('email', this.email);
      localStorage.setItem('role', this.role);

      alert('Profile Updated Successfully ✅');
    },
    error: (err) => {
      console.error('FULL ERROR:', err);

      // IMPORTANT: show backend message
      if (err.error) {
        console.log('Backend Error:', err.error);
      }

      alert(err.error?.message || 'Something went wrong ❌');
    }
  });
  }
}