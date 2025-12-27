import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class AboutPage {
  about: string = 'Hi, thanks for visiting my profile.\nI am all about enjoying the small things in life and grabbing every opportunity';

  constructor(private router: Router) {}

  submit() {
    // TODO: integrate API
    this.router.navigateByUrl('/tabs/profile');
  }
}
