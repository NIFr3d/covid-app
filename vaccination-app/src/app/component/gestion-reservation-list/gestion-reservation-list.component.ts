import { Component } from '@angular/core';

@Component({
  selector: 'app-gestion-reservation-list',
  templateUrl: './gestion-reservation-list.component.html',
  styleUrls: ['./gestion-reservation-list.component.scss']
})
export class GestionReservationListComponent {
  userEmail: string = "";
  userName: string = "";
  centreName: string = "";

  searchByUser() {
    // Implémentez la logique de recherche par utilisateur ici
  }

  searchByCentre() {
    // Implémentez la logique de recherche par centre ici
  }
}