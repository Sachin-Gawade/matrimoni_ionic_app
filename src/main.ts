import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { register } from 'swiper/element/bundle';
import { addIcons } from 'ionicons';
import {
  chevronBackOutline,
  maleOutline,
  femaleOutline,
  personOutline,
  mailOutline,
  callOutline,
  lockClosedOutline,
  eyeOutline,
  eyeOffOutline,
  searchOutline,
  notificationsOutline,
  giftOutline,
  chatbubbleEllipsesOutline,
  starOutline,
  heartOutline,
  checkmarkOutline,
  personCircleOutline,
  logInOutline,
  logOutOutline,
  banOutline,
  heart,
  colorPaletteOutline,
  copyOutline,
  gridOutline,
  arrowRedoOutline,
  chatboxOutline,
  documentOutline,
  documentTextOutline,
  cardOutline,
  statsChartOutline,
  helpCircleOutline,
  shieldCheckmarkOutline
} from 'ionicons/icons';
import { AppComponent } from './app/app.component';
import { isDevMode } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideServiceWorker } from '@angular/service-worker';

// Register Swiper web components once
register();

// Register Ionicons used across the app to avoid runtime warnings
addIcons({
  'chevron-back-outline': chevronBackOutline,
  'male-outline': maleOutline,
  'female-outline': femaleOutline,
  'person-outline': personOutline,
  'mail-outline': mailOutline,
  'call-outline': callOutline,
  'lock-closed-outline': lockClosedOutline,
  'eye-outline': eyeOutline,
  'eye-off-outline': eyeOffOutline,
  'search-outline': searchOutline,
  'notifications-outline': notificationsOutline,
  'gift-outline': giftOutline,
  'chatbubble-ellipses-outline': chatbubbleEllipsesOutline,
  'star-outline': starOutline,
  'heart-outline': heartOutline,
  'checkmark-outline': checkmarkOutline,
  'person-circle-outline': personCircleOutline,
  'log-in-outline': logInOutline,
  'log-out-outline': logOutOutline,
  'ban-outline': banOutline,
  'heart': heart,
  'color-palette-outline': colorPaletteOutline,
  'copy-outline': copyOutline,
  'grid-outline': gridOutline,
  'arrow-redo-outline': arrowRedoOutline,
  'chatbox-outline': chatboxOutline,
  'document-outline': documentOutline,
  'document-text-outline': documentTextOutline,
  'card-outline': cardOutline,
  'stats-chart-outline': statsChartOutline,
  'help-circle-outline': helpCircleOutline,
  'shield-checkmark-outline': shieldCheckmarkOutline,
});

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideHttpClient(),
    provideServiceWorker('ngsw-worker.js', {
            enabled: !isDevMode(),
            registrationStrategy: 'registerWhenStable:30000'
          }),
  ],
});
