import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Preferences } from '@capacitor/preferences';
import { environment } from '../../environments/environment';

export interface RegisterPayload {
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  password: string;
  mobileNo: string;
  gender: 'male' | 'female';
}

export interface RegisterResponse {
  userName: string;
  userId: string;
  token: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export type LoginResponse = RegisterResponse;

@Injectable({ providedIn: 'root' })
export class ApiService {
  // Base URL starts from environment but can be overridden at runtime via Preferences
  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {
    this.initBaseUrlOverride();
  }

  private async initBaseUrlOverride(): Promise<void> {
    try {
      const { value } = await Preferences.get({ key: 'api_base_url' });
      if (value && value.length > 0) {
        this.baseUrl = value;
      }
    } catch {
      // Ignore errors and keep environment default
    }
  }

  getBaseUrl(): string {
    return this.baseUrl;
  }

  async updateBaseUrl(url: string): Promise<void> {
    this.baseUrl = url;
    try {
      await Preferences.set({ key: 'api_base_url', value: url });
    } catch {
      // Ignore persistence errors; in-memory value still used
    }
  }

  // Users
  register(payload: RegisterPayload): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${this.baseUrl}/users/register`, payload);
  }

  login(payload: LoginPayload): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/users/login`, payload);
  }

  async storeAuth(res: Partial<RegisterResponse>): Promise<void> {
    if (res?.token) {
      await Preferences.set({ key: 'auth_token', value: res.token });
    }
    if (res?.userName) {
      await Preferences.set({ key: 'user_name', value: res.userName });
    }
    await Preferences.set({ key: 'user_id', value: res?.userId ?? '' });
  }
}
