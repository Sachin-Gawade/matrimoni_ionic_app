import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [CommonModule, IonContent],
  template: `
    <ion-content class=\"logout-content\">
      <div class=\"logout-hero\">
        <div class=\"logout-curve\"></div>
        <div class=\"logout-card\">
          <div class=\"logout-icon\">👋</div>
          <div class=\"logout-text\">
            <h2>See you soon!</h2>
            <p>Signing you out securely…</p>
          </div>
          <div class=\"logout-spinner\"></div>
        </div>
      </div>
    </ion-content>
  `,
  styles: [
    `
    .logout-content { --background: #ffffff; }
    .logout-hero { position: relative; padding-top: 12vh; min-height: 100vh; }
    .logout-curve { position: absolute; inset: 0 0 auto 0; height: 42vh; background: linear-gradient(180deg,#ff3b6b 0%, #ff215b 100%); border-bottom-left-radius: 42px; }
    .logout-card { position: relative; margin: 0 auto; max-width: 320px; padding: 20px 18px; display: grid; grid-template-columns: 56px 1fr 40px; gap: 14px; align-items: center; background: rgba(255,255,255,0.14); border-radius: 16px; backdrop-filter: blur(4px); box-shadow: 0 12px 24px rgba(0,0,0,0.15); }
    .logout-icon { width: 56px; height: 56px; border-radius: 14px; display: grid; place-items: center; font-size: 24px; background: #fff; box-shadow: 0 8px 18px rgba(0,0,0,0.15); }
    .logout-text h2 { margin: 0; font-size: 20px; font-weight: 800; color: #fff; }
    .logout-text p { margin: 6px 0 0; color: #ffe1e7; font-weight: 600; }
    .logout-spinner { width: 40px; height: 40px; border-radius: 50%; border: 3px solid rgba(255,255,255,0.7); border-top-color: #ffb400; animation: spin 1s linear infinite; }
    @keyframes spin { to { transform: rotate(360deg); } }
    `
  ],
})
export class LogoutPage implements OnInit {
  constructor(private router: Router) {}

  async ngOnInit() {
    try {
      // Clear Capacitor Preferences (key-value storage)
      await Preferences.clear();
    } catch {}

    try {
      // Clear browser storages if running on web
      localStorage.clear();
      sessionStorage.clear();
    } catch {}

    // If you keep auth in cookies, consider clearing those as well
    // Optionally, clear any custom caches or in-memory singletons here

    // Briefly show logout screen for UX polish, then navigate
    setTimeout(() => {
      this.router.navigateByUrl('/onboarding', { replaceUrl: true });
    }, 2500);
  }
}
