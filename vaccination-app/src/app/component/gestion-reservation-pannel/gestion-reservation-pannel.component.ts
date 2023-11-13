import { Component } from '@angular/core';
import { VaccinationCenter } from 'src/app/entities/vaccination-center';
import { CenterService } from 'src/app/service/center.service';

@Component({
  selector: 'app-gestion-reservation-pannel',
  templateUrl: './gestion-reservation-pannel.component.html',
  styleUrls: ['./gestion-reservation-pannel.component.scss']
})
export class GestionReservationPannelComponent {
  userEmail: string = "";
  userName: string = "";
  centreName: string = "";
  centres! : VaccinationCenter[];
  filteredCentres! : VaccinationCenter[];


  constructor(private centreService: CenterService) {}

  ngOnInit() {
    this.centreService.getAllVaccinationCenters().subscribe((centres) => {
      this.centres = centres;
      this.filteredCentres = centres;
    });
  }


  searchByUser() {
    // Implémentez la logique de recherche par utilisateur ici
  }

  searchByCentre() {
    if (this.centreName) {
      this.filteredCentres = this.centres.filter(centre => centre.nom.includes(this.centreName));
    } else {
      this.filteredCentres = this.centres;
    }
  }
}
