import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

    
  getUserInfos(){
    return this.http.get('/api/user/getUserInfos');
  }

  updateUserInfos(email: string, nom: string, prenom: string, telephone: string) {
    const body = { email, nom, prenom, telephone };
    return this.http.post('/api/user/updateUserInfos', body, {headers: new HttpHeaders({ 'Content-Type': 'application/json' })});
  }

  updateUserPassword(oldPassword: string, newPassword: string) {
    const body = { oldPassword, newPassword };
    return this.http.post('/api/user/updateUserPassword', body, {headers: new HttpHeaders({ 'Content-Type': 'application/json' })});
  }
}
