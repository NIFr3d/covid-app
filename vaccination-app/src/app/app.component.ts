import { Component } from '@angular/core';
import { StorageService } from './service/storage.service';
import { UserService } from './service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'vaccination-app';
  isLoggedIn = this.storageService.isLoggedIn();
  canSeeGestion = this.storageService.isAdmin() || this.storageService.isMedecin() || this.storageService.isSuperAdmin();
  nom? : string;
  prenom? : string;

  constructor(private userService : UserService, private storageService : StorageService) {
    if(this.isLoggedIn){
      this.userService.getUserInfos().subscribe((data : any) => {
        this.nom = data.nom;
        this.prenom = data.prenom[0] + '.';
      });
    }
  }

  logout() : void {
    this.storageService.clean();
    location.replace('/');
  }

}
