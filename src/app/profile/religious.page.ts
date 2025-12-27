import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-religious',
  templateUrl: './religious.page.html',
  styleUrls: ['./religious.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class ReligiousPage {
  religion = 'Hindu';
  caste = 'Dhangar';
  subCaste = 'Shegar';
  manglik = 'Not Accepted';
  motherTongue = 'Marathi';

  constructor(private router: Router) {}

  submit() {
    // TODO: integrate API save
    this.router.navigateByUrl('/tabs/profile');
  }
}
