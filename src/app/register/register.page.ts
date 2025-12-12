import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { IonicModule, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import type { RegisterResponse } from '../services/api.service';
import { AppHeaderComponent } from '../components/app-header/app-header.component';

/**
 * RegisterPage
 * - Standalone Ionic Angular page for user sign-up
 * - Matches the provided design with curved header, gender toggle, inputs, and Send OTP button
 */
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule, AppHeaderComponent],
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss']
})
export class RegisterPage {
  private tenDigitMobile(control: AbstractControl): ValidationErrors | null {
    const val = (control.value ?? '').toString();
    return /^\d{10}$/.test(val) ? null : { mobileInvalid: true };
  }
  // Reactive form for registration inputs
  form = this.fb.group({
    gender: ['female', Validators.required],
    firstName: ['', [Validators.required, Validators.minLength(3)]],
    middleName: [''],
    lastName: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    mobile: ['', [Validators.required, this.tenDigitMobile.bind(this)]],
    password: ['', [Validators.required, Validators.minLength(5), Validators.pattern(/^\S+$/)]],
  });

  showPassword = false;
  loading = false;
  submitted = false;

  constructor(private fb: FormBuilder, private router: Router, private api: ApiService, private alertCtrl: AlertController) {}

  ngOnInit() {
    this.form.controls.mobile.valueChanges.subscribe((val) => {
      const value = (val ?? '').toString();
      const digits = value.replace(/\D+/g, '').slice(0, 10);
      if (digits !== value) {
        this.form.controls.mobile.setValue(digits, { emitEvent: false });
        this.form.controls.mobile.updateValueAndValidity({ onlySelf: true });
      }
    });

    this.form.controls.password.valueChanges.subscribe((val) => {
      const value = (val ?? '').toString();
      if (/\s/.test(value)) {
        const cleaned = value.replace(/\s+/g, '');
        this.form.controls.password.setValue(cleaned, { emitEvent: false });
        this.presentErrorAlert('Spaces are not allowed in password');
      }
    });
  }
  // Sanitize mobile input (Ionic emits value in event.detail.value)
  onMobileInput(ev: Event) {
    const value = (ev as any)?.detail?.value ?? '';
    const digits: string = String(value).replace(/\D+/g, '').slice(0, 10);
    if (this.form.controls.mobile.value !== digits) {
      this.form.controls.mobile.setValue(digits, { emitEvent: true });
      this.form.controls.mobile.updateValueAndValidity({ onlySelf: true });
    }
  }

  // Toggle gender selection per design
  selectGender(value: 'male' | 'female') {
    this.form.patchValue({ gender: value });
  }

  // Toggle password visibility icon
  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  // Submit handler - here we just navigate or log
  async submit() {
    this.submitted = true;
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    const payload = {
      firstName: this.form.value.firstName!,
      middleName: this.form.value.middleName ?? '',
      lastName: this.form.value.lastName!,
      email: this.form.value.email!,
      password: this.form.value.password!,
      mobileNo: this.form.value.mobile!,
      gender: this.form.value.gender as 'male' | 'female'
    };

    this.api.register(payload).subscribe({
      next: async (res) => {
        await this.api.storeAuth(res as RegisterResponse);
        this.router.navigateByUrl('/login');
        this.loading = false;
      },
      error: async (err) => {
        console.error('Register API error', err?.error?.message);
        const msg: string = err?.error?.message ?? 'Registration failed';
        await this.presentErrorAlert(msg);
        this.loading = false;
      }
    });
  }

  // Navigate to login (if needed later)
  goToLogin() {
    this.router.navigateByUrl('/login');
  }

  // Back to onboarding or previous page
  goBack() {
    window.history.back();
  }

  private async presentErrorAlert(message: string): Promise<void> {
    const alert = await this.alertCtrl.create({
      header: 'Registration Error',
      message,
      buttons: [{ text: 'OK', role: 'cancel', cssClass: 'error-alert-button' }],
      cssClass: 'error-alert',
      mode: 'ios',
      backdropDismiss: false
    });
    await alert.present();
  }
}
