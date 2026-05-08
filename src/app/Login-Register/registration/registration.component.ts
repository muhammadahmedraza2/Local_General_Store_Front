import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

  form!: FormGroup;

  showPassword: boolean = false;

  selectedFile: File | null = null;

  storeLogoFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.initForm();
  }

  initForm() {

    this.form = this.fb.group({

      name: ['', Validators.required],

      email: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],

      password: ['', Validators.required],

      phone: [''],

      storeName: ['', Validators.required],

      dateOfBirth: [''],

      gender: ['']

    });

  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  // PROFILE IMAGE
  onFileSelected(event: Event) {

    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }

  }

  // STORE LOGO
  onStoreLogoSelected(event: Event) {

    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      this.storeLogoFile = input.files[0];
    }

  }

  register() {

    if (this.form.invalid) {

      this.form.markAllAsTouched();

      alert('Please fill required fields');

      return;
    }

    const formData = new FormData();

    formData.append(
      'name',
      this.form.value.name.trim()
    );

    formData.append(
      'email',
      this.form.value.email.trim()
    );

    formData.append(
      'password',
      this.form.value.password
    );

    formData.append(
      'phone',
      this.form.value.phone || ''
    );

    formData.append(
      'storeName',
      this.form.value.storeName || ''
    );

    formData.append(
      'dateOfBirth',
      this.form.value.dateOfBirth || ''
    );

    formData.append(
      'gender',
      this.form.value.gender || ''
    );

    // PROFILE IMAGE
    if (this.selectedFile) {

      formData.append(
        'profileImage',
        this.selectedFile
      );

    }

    // STORE LOGO
    if (this.storeLogoFile) {

      formData.append(
        'storeLogo',
        this.storeLogoFile
      );

    }

    this.auth.register(formData).subscribe({

      next: (res) => {

        console.log(res);

        this.auth.saveUser(res);

        alert('Registered Successfully');

        this.router.navigate(['/login']);

      },

      error: (err) => {

        console.log(err);

        alert(
          err.error || 'Registration Failed'
        );

      }

    });

  }

}