import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn() {
    return true;
  }

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    const body = { email, password };
    return this.http.post('/api/auth/login', body, {headers: new HttpHeaders({ 'Content-Type': 'application/json' })});
  }

  logout(): Observable<any> {
    return this.http.post('/api/auth/logout', {});
  }
}
