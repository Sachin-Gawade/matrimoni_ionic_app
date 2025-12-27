## AI Coding Agent Instructions

This is an Ionic 8 + Angular 20 standalone app with Capacitor 7 for native builds. It is a matrimony-style app with onboarding, auth, a tabbed shell, and a multi-section profile builder.

### Core Architecture
- Bootstrap: src/main.ts calls bootstrapApplication(AppComponent) with provideRouter(routes, withPreloading(PreloadAllModules)), provideIonicAngular(), provideHttpClient(), and provideServiceWorker (enabled when !isDevMode()).
- Icons & Swiper: src/main.ts registers Swiper web components and all Ionicons used across the app via addIcons; add any new icons here to avoid runtime warnings.
- Routing shell: src/app/app.routes.ts holds top-level routes (onboarding, register, login, logout) and a guarded tabs route (loadChildren to src/app/tabs/tabs.routes.ts). The bare /profile path redirects to /tabs/profile.
- Tabs layout: src/app/tabs/tabs.routes.ts defines a TabsPage shell with child routes for tab1, tab2, tab3, and the profile stack under /tabs/profile/**.

### Auth, Storage, and API
- Guard: src/app/auth.guard.ts checks for an auth_token in Capacitor Preferences (preferred) with a localStorage fallback; unauthenticated users are redirected to /onboarding, and /tabs is always guarded.
- API service: src/app/services/api.service.ts wraps HttpClient and uses environment.apiBaseUrl as baseUrl. It exposes register and login methods (POST /users/register and /users/login).
- Auth persistence: ApiService.storeAuth writes auth_token, user_name, and user_id into Capacitor Preferences. Reuse or extend this helper instead of writing Preferences logic directly in pages.
- Logout flow: src/app/logout/logout.page.ts clears Preferences, localStorage, and sessionStorage, then navigates to /onboarding after a brief delay for UX polish.

### Profile & Navigation Patterns
- Profile shell: src/app/profile/profile.page.ts is a standalone Ionic page with local UI state for which profile sections are expanded and an internal tab ("My Profile" vs "My Preferences"). It navigates to sub-pages via Router.navigateByUrl('/tabs/profile/…').
- Profile subsections: each profile section (basic-info, about, religious, education, family, location, partner-preferences) is its own standalone page (e.g., src/app/profile/basic-info.page.ts) registered as a child route under /tabs/profile/** in tabs.routes.ts.
- Forms: profile subpages use template-driven forms (FormsModule) with local component state and currently stubbed submit handlers (e.g., BasicInfoPage.submit just navigates back to /tabs/profile). When wiring backend integration, call ApiService here or through a dedicated profile service.

### Environments & Configuration
- API base URLs: src/environments/environment.ts and environment.prod.ts define apiBaseUrl (currently the same LAN IP). All HTTP calls should go through ApiService using this base URL; do not hardcode URLs.
- Build-time replacement: ng build replaces environment.ts with environment.prod.ts via angular.json fileReplacements.
- Capacitor: capacitor.config.ts points webDir to www; always build with ng build before npx cap sync/open for Android or iOS.

### Developer Workflows
- Dev server (web only): npm start  →  ng serve
- Production build (for www/ and Capacitor): npm run build  →  ng build
- Dev watch build: npm run watch  →  ng build --watch --configuration development
- Testing & linting: npm test  →  ng test (Karma/Jasmine); npm run lint  →  ng lint (@angular-eslint).

### Conventions for New Code
- Components: use Angular standalone components and import IonicModule/CommonModule/FormsModule (and others) directly in the component’s imports array.
- Routing: lazy load pages with loadComponent; for anything inside the tabbed UI, add child routes under src/app/tabs/tabs.routes.ts rather than at the top level.
- Navigation: prefer absolute URLs with Router.navigateByUrl (e.g., '/tabs/profile/basic-info') to remain consistent with existing flows.
- Styling: global styles live in src/global.scss, theme variables in src/theme/variables.scss, and each page has its own .scss (except a few pages like LogoutPage that define inline styles).
