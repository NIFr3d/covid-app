import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    const body = { email, password };
    return this.http.post('/api/auth/login', body, {headers: new HttpHeaders({ 'Content-Type': 'application/json' })});
  }

  register(email: string, password: string, nom: string, prenom: string, telephone: string) {
    const body = { email, password, nom, prenom, telephone };
    return this.http.post('/api/auth/register', body, {headers: new HttpHeaders({ 'Content-Type': 'application/json' })});
  }

  
  getUserInfos(){
    return this.http.get('/api/auth/getUserInfos');
  }

  updateUserInfos(email: string, nom: string, prenom: string, telephone: string) {
    const body = { email, nom, prenom, telephone };
    return this.http.post('/api/auth/updateUserInfos', body, {headers: new HttpHeaders({ 'Content-Type': 'application/json' })});
  }

  updateUserPassword(oldPassword: string, newPassword: string) {
    const body = { oldPassword, newPassword };
    return this.http.post('/api/auth/updateUserPassword', body, {headers: new HttpHeaders({ 'Content-Type': 'application/json' })});
  }


}
