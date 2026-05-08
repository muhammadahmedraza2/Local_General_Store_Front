import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/services/auth.service';
import { ThemeService } from 'src/services/theme.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  // Personal
  name: string = '';
  email: string = '';
  role: string = '';
  phone: string = '';
  dob: string = '';
  gender: string = 'male';

  // Store
  storeName: string = '';
  storeDescription: string = '';
  storeCategory: string = 'General Store';
  storeAddress: string = '';

  // Security
  currentPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  emailAlerts: boolean = true;
  smsAlerts: boolean = false;
  twoFactor: boolean = true;

  // UI
  activeTab: string = 'personal';
  selectedTheme: string = 'blue';
  selectedFont: string = 'Arial, Helvetica, sans-serif';
  selectedSize: string = '15px';
  pwdStrength: number = 0;
  pwdColor: string = '';
  toastMsg: string = '';
  toastVisible: boolean = false;

  // Images
  imageUrl: string = 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png';
  storeLogoUrl: string = '';

  // Stats
  orders: number = 24;
  products: number = 142;
  rating: number = 4.8;

  themes: any = {
    blue:   { primary:'#0d5cab', bg:'#e6cfcf' },
    purple: { primary:'#533ab7', bg:'#ede9fc' },
    teal:   { primary:'#0f6e56', bg:'#d4ede6' },
    coral:  { primary:'#993c1d', bg:'#f5ddd6' },
    dark:   { primary:'#5b9cf6', bg:'#111827' },
    green:  { primary:'#3b6d11', bg:'#dcedc8' }
  };

  fonts: any[] = [
    { label: 'Arial',      value: 'Arial, Helvetica, sans-serif' },
    { label: 'Segoe UI',   value: "'Segoe UI', sans-serif" },
    { label: 'Georgia',    value: 'Georgia, serif' },
    { label: 'Courier',    value: "'Courier New', monospace" },
    { label: 'Verdana',    value: 'Verdana, sans-serif' },
    { label: 'Trebuchet',  value: 'Trebuchet MS, sans-serif' }
  ];

  constructor(private http: HttpClient, private auth: AuthService,private themeService: ThemeService) {}

  ngOnInit(): void {
    const user = this.auth.getUser();

    this.name        = user.name        || '';
    this.email       = user.email       || '';
    this.role        = user.role        || 'User';
    this.phone       = user.phone       || '';
    this.gender      = user.gender      || 'male';
    this.storeName   = user.storeName   || '';
    this.dob = user.dateOfBirth
      ? new Date(user.dateOfBirth).toISOString().split('T')[0]
      : '';

    this.imageUrl = user.profileImage
      ? 'https://YOUR_API_URL/uploads/' + user.profileImage
      : 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png';

    this.storeLogoUrl = user.storeLogo
      ? 'https://YOUR_API_URL/uploads/' + user.storeLogo
      : '';
  }

  // ==========================
  // TABS
  // ==========================
  setTab(tab: string) {
    this.activeTab = tab;
  }

  // ==========================
  // THEME
  // ==========================
applyTheme(name: string) {

  this.selectedTheme = name;

  const t = this.themes[name];

  this.themeService.applyTheme(t);
}

  // ==========================
  // FONT
  // ==========================
applyFont(font: string) {

  this.selectedFont = font;

  this.themeService.applyFont(font);
}

  // ==========================
  // SIZE
  // ==========================
applySize(size: string) {

  this.selectedSize = size;

  this.themeService.applySize(size);
}

  // ==========================
  // IMAGE UPLOAD
  // ==========================
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      this.imageUrl = reader.result as string;
      const user = this.auth.getUser();
      user.profileImage = this.imageUrl;
      localStorage.setItem('user', JSON.stringify(user));
    };
    reader.readAsDataURL(file);
  }

  onLogoChange(event: any) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      this.storeLogoUrl = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  // ==========================
  // PASSWORD STRENGTH
  // ==========================
  checkPassword(val: string) {
    this.newPassword = val;
    let score = 0;
    if (val.length >= 8)          score++;
    if (/[A-Z]/.test(val))        score++;
    if (/[0-9]/.test(val))        score++;
    if (/[^a-zA-Z0-9]/.test(val)) score++;
    this.pwdStrength = score * 25;
    const colors = ['#e24b4a', '#ef9f27', '#639922', '#0f6e56'];
    this.pwdColor = val ? colors[score - 1] || '#e24b4a' : '';
  }

  // ==========================
  // SAVE PERSONAL
  // ==========================
saveProfile() {
  const user = this.auth.getUser();

  const payload = {
    userId:      user.userId,  // ✅ yeh missing tha
    name:        this.name,
    email:       this.email,
    role:        this.role,
    phone:       this.phone,
    dateOfBirth: this.dob,
    gender:      this.gender,
  };

  this.auth.updateProfile(payload).subscribe({
    next: (res: any) => {
      localStorage.setItem('user', JSON.stringify({ ...user, ...payload }));
      this.showToast('Personal info saved! ✅');
    },
    error: (err) => {
      this.showToast(err.error?.message || 'Error updating profile ❌');
    }
  });
}
  // ==========================
  // SAVE STORE
  // ==========================
saveStore() {
  const user = this.auth.getUser(); // ✅ pehle user lo

  const payload = {
    userId:           user.userId,    // ✅ zaroori
    name:             this.name       || user.name,   // ✅ zaroori
    email:            this.email      || user.email,  // ✅ zaroori
    role:             this.role       || user.role,   // ✅ zaroori
    storeName:        this.storeName,
    storeDescription: this.storeDescription,
    storeCategory:    this.storeCategory,
    storeAddress:     this.storeAddress,
  };

  this.auth.updateProfile(payload).subscribe({
    next: () => {
      localStorage.setItem('user', JSON.stringify({ ...user, ...payload }));
      this.showToast('Store info saved! ✅');
    },
    error: (err) => {
      this.showToast(err.error?.message || 'Error ❌');
    }
  });
}

  // ==========================
  // UPDATE PASSWORD
  // ==========================

// profile.component.ts mein yeh console add karo temporarily
// updateSecurity() {
//   console.log('Current pwd bheja:', this.currentPassword); // ✅ yeh dekho
//   console.log('UserId:', this.auth.getUser().userId);

//   if (this.newPassword !== this.confirmPassword) {
//     this.showToast('Passwords do not match ❌');
//     return;
//   }
//   // ...baaki code
// }


updateSecurity() {
    if (this.newPassword !== this.confirmPassword) {
      this.showToast('Passwords do not match ❌');
      return;
    }

    const user = this.auth.getUser();  // ✅ userId lao

    const payload = {
      userId:          user.userId,       // ✅ yeh add karo
      currentPassword: this.currentPassword,
      newPassword:     this.newPassword,
    };

    this.http.post('http://localhost:5000/api/Auth/change-password', payload).subscribe({
      next: () => {
        this.showToast('Password updated! ✅');
        this.currentPassword = '';
        this.newPassword = '';
        this.confirmPassword = '';
      },
      error: (err) => this.showToast(err.error?.message || 'Error ❌')
    });
}

// updateSecurity() {
//     if (this.newPassword !== this.confirmPassword) {
//       this.showToast('Passwords do not match ❌');
//       return;
//     }

//     const user = this.auth.getUser();  // ✅ userId lao

//     const payload = {
//       userId:          user.userId,       // ✅ yeh add karo
//       currentPassword: this.currentPassword,
//       newPassword:     this.newPassword,
//     };

//     this.http.post('http://localhost:5000/api/Auth/change-password', payload).subscribe({
//       next: () => {
//         this.showToast('Password updated! ✅');
//         this.currentPassword = '';
//         this.newPassword = '';
//         this.confirmPassword = '';
//       },
//       error: (err) => this.showToast(err.error?.message || 'Error ❌')
//     });
// }

  // ==========================
  // TOAST
  // ==========================
  showToast(msg: string) {
    this.toastMsg = msg;
    this.toastVisible = true;
    setTimeout(() => this.toastVisible = false, 2500);
  }
}