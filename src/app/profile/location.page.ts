import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-location',
  templateUrl: './location.page.html',
  styleUrls: ['./location.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class LocationPage {
  city = 'Pune';
  state = 'Maharashtra';

  constructor(private router: Router) {}

  submit() {
    this.router.navigateByUrl('/tabs/profile');
  }
}
