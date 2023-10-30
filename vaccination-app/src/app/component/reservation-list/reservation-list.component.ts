import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ReservationService } from 'src/app/service/reservation.service';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.scss']
})
export class ReservationListComponent {

  reservations : any;
  displayedColumns: string[] = ['date', 'centre', 'time', 'cancel'];

  constructor(private reservationService : ReservationService,
              private router : Router
              ) 
              { 
                this.reservationService.getReservationsByUser().subscribe(res => {
                  this.reservations = res;
                });
              }

  cancelReservation(id : number){
    if(!confirm("Voulez-vous vraiment annuler cette réservation ?")) return;
    this.reservationService.cancelReservation(id).subscribe({
      next : data => {
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
          this.router.navigate(["/reservations"]);
      });
      },
      error : error => {
        alert(error.message);
      }
    });
  }
}
