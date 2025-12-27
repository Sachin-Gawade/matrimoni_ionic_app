import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-education',
  templateUrl: './education.page.html',
  styleUrls: ['./education.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class EducationPage {
  highestEducation = 'B.Tech';
  occupation = 'Engineer';

  constructor(private router: Router) {}

  submit() {
    this.router.navigateByUrl('/tabs/profile');
  }
}
