import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../entities/user';

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

  searchUser(search: string) : Observable<User[]> {
    const params = new HttpParams().set('email', search);
    return this.http.post<User[]>('/api/user/admin/searchUser', null, {params});
  }

  updateUser(user: User) {
    return this.http.post('/api/user/admin/updateUser', user);
  }

  deleteUser(user: User) {
    const params = new HttpParams().set('email', user.email);
    return this.http.post('/api/user/admin/deleteUser', null, {params});
  }
}
