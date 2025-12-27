import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class ProfilePage {
  sections = {
    basic: false,
    about: false,
    religious: false,
    education: false,
    family: false,
    location: false,
  };

  // Internal tab state between "My Profile" and "My Preferences"
  activeTab: 'profile' | 'preferences' = 'profile';
  showPartnerPreferences = true;

  constructor(private router: Router) {}

  toggle(key: keyof ProfilePage['sections']) {
    this.sections[key] = !this.sections[key];
  }

  switchTab(tab: 'profile' | 'preferences') {
    this.activeTab = tab;
  }

  goBasicInfo() {
    this.router.navigateByUrl('/tabs/profile/basic-info');
  }

  goAbout() {
    this.router.navigateByUrl('/tabs/profile/about');
  }

  goReligious() {
    this.router.navigateByUrl('/tabs/profile/religious');
  }

  goEducation() {
    this.router.navigateByUrl('/tabs/profile/education');
  }

  goFamily() {
    this.router.navigateByUrl('/tabs/profile/family');
  }

  goLocation() {
    this.router.navigateByUrl('/tabs/profile/location');
  }

  goPartnerPreferences() {
    this.router.navigateByUrl('/tabs/profile/partner-preferences');
  }
}
