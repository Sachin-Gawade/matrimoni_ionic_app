import { Component, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [IonicModule, CommonModule],
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent {
  @Input() pageTitle = ''; // Top-left toolbar title e.g., "Login" or "Sign Up"
  @Input() subtitle = 'saptaphere.com'; // Small text under main welcome title
  @Input() showBack = true; // Toggle back button visibility if needed

  // Main welcome heading can be kept constant or made configurable later
  @Input() welcomeTitle = 'Welcome to';
}
