import { Component } from '@angular/core';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-gestion-panel',
  templateUrl: './gestion-panel.component.html',
  styleUrls: ['./gestion-panel.component.scss']
})
export class GestionPanelComponent {

  isAdmin : boolean = this.storageService.isAdmin();
  isMedecin : boolean = this.storageService.isMedecin();
  
  constructor(private storageService : StorageService) { }

}
