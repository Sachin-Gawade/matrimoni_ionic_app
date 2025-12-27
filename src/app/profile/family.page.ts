import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-family',
  templateUrl: './family.page.html',
  styleUrls: ['./family.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class FamilyPage {
  fatherOccupation = 'Business';
  motherOccupation = 'Homemaker';

  constructor(private router: Router) {}

  submit() {
    this.router.navigateByUrl('/tabs/profile');
  }
}
