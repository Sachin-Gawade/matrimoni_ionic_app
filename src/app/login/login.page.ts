import { Component } from '@angular/core';
import { AppHeaderComponent } from '../components/app-header/app-header.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { IonicModule, ToastController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

/**
 * LoginPage
 * - Premium, responsive login screen matching provided design
 * - Curved hero header, inputs with icons, actions: Login, Forgot Password, Log In with OTP
 */
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule, AppHeaderComponent],
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage {
  form = this.fb.group({
    username: ['', Validators.required], // mobile/email
    password: ['', [Validators.required, Validators.minLength(6), Validators.pattern(/^\S+$/)]],
    showPassword: [false]
  });
  submitted = false;
  private passwordSpaceWarned = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private api: ApiService,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController
  ) {}

  togglePassword() {
    const current = !!this.form.value.showPassword;
    this.form.patchValue({ showPassword: !current });
  }

  ngOnInit() {
    this.form.controls.password.valueChanges.subscribe((val) => {
      const value = (val ?? '').toString();
      if (/\s/.test(value)) {
        const cleaned = value.replace(/\s+/g, '');
        this.form.controls.password.setValue(cleaned, { emitEvent: false });
        if (!this.passwordSpaceWarned) {
          this.presentErrorAlert('Spaces are not allowed in password');
          this.passwordSpaceWarned = true;
        }
      } else {
        this.passwordSpaceWarned = false;
      }
    });
  }

  login() {
    this.submitted = true;
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      return;
    }
    // Prepare payload: login expects email + password per API
    const payload = {
      email: this.form.value.username!,
      password: this.form.value.password!,
    };

    this.api.login(payload).subscribe({
      next: (res) => {
        this.api.storeAuth(res).then(() => {
          this.router.navigateByUrl('/tabs');
        });
      },
      error: (err) => {
        console.error('Login API error', err?.error?.message);
        const msg: string = err?.error?.message ?? 'Login failed';
        this.presentErrorAlert(msg);
      }
    });
  }

  private async presentErrorAlert(message: string): Promise<void> {
    const alert = await this.alertCtrl.create({
      header: 'Login Error',
      message,
      buttons: [{ text: 'OK', role: 'cancel', cssClass: 'error-alert-button' }],
      cssClass: 'error-alert',
      mode: 'ios',
      backdropDismiss: false
    });
    await alert.present();
  }

  forgotPassword() {
    // TODO: Navigate to forgot password flow
    console.log('Forgot password');
  }

  loginWithOtp() {
    // TODO: Navigate to OTP login flow
    console.log('Login with OTP');
  }

  goToRegister() {
    this.router.navigateByUrl('/register');
  }

  goBack() {
    window.history.back();
  }
}
