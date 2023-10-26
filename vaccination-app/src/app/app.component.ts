import { Component } from '@angular/core';
import { StorageService } from './service/storage.service';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'vaccination-app';
  isLoggedIn = this.storageService.isLoggedIn();
  nom? : string;
  prenom? : string;

  constructor(private authService : AuthService, private storageService : StorageService) {
    if(this.isLoggedIn){
      this.authService.getUserInfos().subscribe((data : any) => {
        this.nom = data.nom;
        this.prenom = data.prenom;
      });
    }
  }

  logout() : void {
    this.storageService.clean();
    location.replace('/');
  }

}
