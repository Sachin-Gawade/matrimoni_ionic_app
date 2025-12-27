import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-basic-info',
  templateUrl: './basic-info.page.html',
  styleUrls: ['./basic-info.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class BasicInfoPage {
  dob: string | undefined = '1993-05-23';
  maritalStatus = 'Unmarried';
  height = '5 feet 8 inch';
  weight: string | undefined;
  bloodGroup = 'B+';
  birthTime = '22:25';
  zodiac = 'Virgo';
  profileCreatedBy = 'Parents';
  mobile = '7020498612';

  constructor(private router: Router) {}

  submit() {
    // TODO: Integrate API call
    this.router.navigateByUrl('/tabs/profile');
  }
}
