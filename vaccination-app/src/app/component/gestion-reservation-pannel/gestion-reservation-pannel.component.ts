import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Reservation } from 'src/app/entities/reservation';
import { VaccinationCenter } from 'src/app/entities/vaccination-center';
import { CenterService } from 'src/app/service/center.service';
import { ReservationService } from 'src/app/service/reservation.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-gestion-reservation-pannel',
  templateUrl: './gestion-reservation-pannel.component.html',
  styleUrls: ['./gestion-reservation-pannel.component.scss']
})
export class GestionReservationPannelComponent {
  userEmail: string = "";
  userNom: string = "";
  userPrenom: string = "";
  centre!: VaccinationCenter;
  reservations: Reservation[] = [];
  isAdmin : boolean = this.storageService.isAdmin();


  constructor(private centreService: CenterService,
              private reservationService : ReservationService,
              private storageService : StorageService,
              private snackBar : MatSnackBar) {}

  ngOnInit() {
    this.centreService.getVaccinationCenterForMedecin().subscribe((centre) => {
      this.centre = centre;
    });
  }


  searchByUser() {
    if(this.userEmail == "" && this.userNom == "" && this.userPrenom == ""){
      this.snackBar.open("Veuillez remplir au moins un champ", "Fermer", {duration: 2000});
      return;
    }
    this.reservationService.getReservationsByMedecinSearch(this.userEmail, this.userNom, this.userPrenom, this.centre.id).subscribe((reservations) => {
      this.reservations = reservations;
    });
  }

  confirmVaccination(id: string) {
    if(!confirm("Êtes-vous sûr de vouloir valider cette vaccination ?")) return;
    this.reservationService.confirmVaccination(id).subscribe({
      next: (data: any) => {
        this.reservations = this.reservations?.filter(r => r.id !== id);
        this.snackBar.open(data.message, "OK", {
          duration: 2000,
        });
      },
      error: (error: any) => {
        this.snackBar.open(error, "Fermer", {
          duration: 2000,
        });
      }
    });
  }

  deleteReservation(id: string) {
    if(!confirm("Êtes-vous sûr de vouloir supprimer cette réservation ?")) return;
    this.reservationService.deleteReservation(id).subscribe({
      next: (data: any) => {
        this.reservations = this.reservations?.filter(r => r.id !== id);
        this.snackBar.open(data.message, "OK", {
          duration: 2000,
        });
      },
      error: (error: any) => {
        this.snackBar.open(error, "Fermer", {
          duration: 2000,
        });
      }
    });
  }
}
