import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private http: HttpClient) { }

  clean() : void {
    window.sessionStorage.clear();
  }

  public saveUser(user: any) : void {
    window.sessionStorage.removeItem('auth-user');
    window.sessionStorage.setItem('auth-user', JSON.stringify(user));
  }

  public getUser() : any {
    const user = window.sessionStorage.getItem('auth-user');
    if (user) {
      return JSON.parse(user);
    }
    return null;
  }

  public isMedecin() : boolean {
    const user = this.getUser();
    if (user) {
      return user.roles.includes('MEDECIN') || user.roles.includes('ADMIN');
    }
    return false;
  }

  public isAdmin() : boolean {
    const user = this.getUser();
    if (user) {
      return user.roles.includes('ADMIN');
    }
    return false;
  }

  public isLoggedIn() : boolean {
    return this.getUser() !== null;
  }
}
