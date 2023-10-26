import { Component } from '@angular/core';
import { StorageService } from './service/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'vaccination-app';
  isLoggedIn = this.StorageService.isLoggedIn();
  nom? : string;
  prenom? : string;

  constructor(private StorageService : StorageService) {
    if(this.isLoggedIn){
      this.StorageService.getNom().subscribe((data : any) => {
        this.nom = data.nom;
      });
      this.StorageService.getPrenom().subscribe((data : any) => {
        this.prenom = data.prenom.toString()[0] + '.';
      });
    }
  }

  logout() : void {
    this.StorageService.clean();
    location.replace('/');
  }

}
