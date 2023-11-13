import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Reservation } from 'src/app/entities/reservation';
import { VaccinationCenter } from 'src/app/entities/vaccination-center';
import { CenterService } from 'src/app/service/center.service';
import { ReservationService } from 'src/app/service/reservation.service';

@Component({
  selector: 'app-gestion-reservation-list',
  templateUrl: './gestion-reservation-list.component.html',
  styleUrls: ['./gestion-reservation-list.component.scss']
})
export class GestionReservationListComponent implements OnInit {
  selectedDay?: Date;
  reservations?: Reservation[];
  centre!: VaccinationCenter;

  constructor(private reservationService: ReservationService,
    private centreService: CenterService,
    private route : ActivatedRoute) { }

  ngOnInit() : void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.centreService.getCenterById(id).subscribe((centre) => {
      this.centre = centre;
    });
  }

  onDaySelected(date: Date) {
    this.selectedDay = date;
    this.reservationService.getReservationsForDayByCentre(date, this.centre.id.toString())
      .subscribe(reservations => this.reservations = reservations);
  }

  deleteReservation(id: string) {
    if(!confirm("Êtes-vous sûr de vouloir supprimer cette réservation ?")) return;
    this.reservationService.deleteReservation(id)
      .subscribe(() => {
        if (this.reservations) {
          this.reservations = this.reservations.filter(r => r.id !== id);
        }
      });
  }
}