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
  const user = this.auth.getUser();

  this.name = user.name || '';
  this.email = user.email || '';
  this.role = user.role || 'User';
  this.phoneNumber = user.phoneNumber || '';
  this.dob = user.dateOfBirth || '';
  this.gender = user.gender || 'Male';

  this.imageUrl =
    user.imageUrl ||
    'https://cdn-icons-png.flaticon.com/512/3135/3135715.png';
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

      const user = this.auth.getUser();
      user.imageUrl = this.imageUrl;

      localStorage.setItem('user', JSON.stringify(user));
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

  this.auth.updateProfile(payload).subscribe({
    next: (res: any) => {

      const user = this.auth.getUser();

      const updatedUser = {
        ...user,
        ...payload
      };

      localStorage.setItem('user', JSON.stringify(updatedUser));

      alert('Profile Updated Successfully ✅');
    },
    error: (err) => {
      console.log(err);
      alert(err.error?.message || 'Error updating profile ❌');
    }
  });
}



}