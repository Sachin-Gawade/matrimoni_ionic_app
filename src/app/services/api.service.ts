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
  // Use environment-configured base URL
  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

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
