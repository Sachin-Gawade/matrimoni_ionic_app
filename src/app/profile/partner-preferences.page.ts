import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface AgeRange {
  lower: number;
  upper: number;
}

@Component({
  selector: 'app-partner-preferences',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  templateUrl: './partner-preferences.page.html',
  styleUrls: ['./partner-preferences.page.scss'],
})
export class PartnerPreferencesPage {
  ageRange: AgeRange = { lower: 23, upper: 32 };

  countries: string[] = ['India'];
  states: string[] = ['Maharashtra'];
  cities: string[] = ['Pune', 'Mumbai', 'Nashik'];

  maritalStatuses: string[] = ['Unmarried', 'Married', 'Divorced'];
  religions: string[] = ['Hindu', 'Muslim', 'Christian', 'Sikh', 'Buddhist'];
  castes: string[] = ['Dhangar', 'Brahmin', 'Maratha'];
  educations: string[] = ['Diploma', 'Graduate', 'Masters'];

  country = 'India';
  state = 'Maharashtra';
  city = '';
  maritalStatus = 'Unmarried';
  religion = 'Hindu';
  caste = 'Dhangar';
  educationSelection: string[] = ['Diploma', 'Graduate', 'Masters'];

  constructor(private router: Router) {}

  get fromAgeLabel(): string {
    return `From ${this.ageRange.lower} Years`;
  }

  get toAgeLabel(): string {
    return `To ${this.ageRange.upper} Years`;
  }

  submit(): void {
    // TODO: send preferences to API once backend is available
    this.router.navigateByUrl('/tabs/profile');
  }
}
