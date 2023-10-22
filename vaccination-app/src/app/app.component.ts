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

  constructor(private StorageService : StorageService) {
  }

  logout() : void {
    this.StorageService.clean();
    location.replace('/');
  }

}
