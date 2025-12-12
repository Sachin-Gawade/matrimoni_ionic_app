import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';

async function hasToken(): Promise<boolean> {
  try {
    // Prefer Capacitor Preferences
    const { value } = await Preferences.get({ key: 'auth_token' });
    if (value && value.length > 0) return true;
  } catch {}
  try {
    // Fallback to localStorage key
    const ls = localStorage.getItem('auth_token');
    if (ls && ls.length > 0) return true;
  } catch {}
  return false;
}

export const authGuard: CanActivateFn = async () => {
  const router = inject(Router);
  const ok = await hasToken();
  if (ok) return true;
  // No token: redirect to onboarding/login
  router.navigateByUrl('/onboarding', { replaceUrl: true });
  return false;
};
