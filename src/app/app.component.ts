import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet, IonMenu, IonContent, IonList, IonItem, IonIcon, IonLabel, IonAvatar, IonButton, IonMenuToggle } from '@ionic/angular/standalone';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Haptics, ImpactStyle } from '@capacitor/haptics';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [
    IonApp,
    IonRouterOutlet,
    IonMenu,
    IonContent,
    IonList,
    IonItem,
    IonIcon,
    IonLabel,
    IonAvatar,
    IonButton,
    IonMenuToggle,
    RouterLink,
    RouterLinkActive,
  ],
})
export class AppComponent {
  constructor() {}

  onMenuItemTap() {
    // Light haptic feedback on menu item tap
    try {
      Haptics.impact({ style: ImpactStyle.Light });
    } catch {
      // Ignore if haptics not available
    }
  }
}
