import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Reservation } from 'src/app/entities/reservation';
import { VaccinationCenter } from 'src/app/entities/vaccination-center';
import { CenterService } from 'src/app/service/center.service';
import { ReservationService } from 'src/app/service/reservation.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-gestion-reservation-list',
  templateUrl: './gestion-reservation-list.component.html',
  styleUrls: ['./gestion-reservation-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GestionReservationListComponent implements OnInit {
  selectedDay?: Date;
  reservations?: Reservation[];
  isAdmin : boolean = this.storageService.isAdmin();
  @Input()
  centre!: VaccinationCenter;

  constructor(private reservationService: ReservationService,
    private centreService: CenterService,
    private route : ActivatedRoute,
    private storageService : StorageService,
    private snackBar: MatSnackBar) { }

  ngOnInit() : void {
  }

  selectDate(date : Date | null){
    if(date) {
      this.onDaySelected(date);
    }
  }

  disableWeekendsFilter = (d: Date): boolean => {
    return (d.getDay() !== 0 && d.getDay() !== 6);
  }

  dateClass = (d: Date): string => {
    let today = new Date();
    today.setHours(0,0,0,0);
    if (d < today) {
      return 'before-today';
    } else if (d > today) {
      return 'after-today';
    } else {
      return 'today';
    }

  }

  onDaySelected(date: Date) {
    this.selectedDay = date;
    this.reservationService.getReservationsForDayByCentre(date, this.centre.id.toString())
      .subscribe(reservations => this.reservations = reservations);
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