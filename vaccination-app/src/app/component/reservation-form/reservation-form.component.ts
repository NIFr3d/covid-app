import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ReservationService } from 'src/app/service/reservation.service';
import { Router } from '@angular/router';

interface Day {
  date: Date;
  availableTimes: string[];
}

interface Week {
  start: Date;
  end: Date;
  days: Day[];
}

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.scss']
})
export class ReservationFormComponent {
  currentWeek: Week;
  minDate: Date; // date minimum pour laquelle on peut faire une réservation (jour actuel ou prochain lundi si on est dimanche)
  times: string[]; // array de string de la forme HH:mm allant de 8:00 à 18:00 par pas de 15 minutes
  centerId = this.route.snapshot.paramMap.get('id');

  constructor(
    private reservationService: ReservationService,
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    private router: Router
  ) {
    let today = new Date();
    if(today.getDay() == 0){ // si on est dimanche, on commence à la semaine suivante
      this.minDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
    }
    else{ // sinon on commence à la semaine en cours
      this.minDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() + 1);
    }
    this.times = this.generateTimes();
    this.currentWeek = this.generateWeek(this.minDate);
  }

  generateTimes(): string[] { // retourne un array de string de la forme HH:mm allant de 8:00 à 18:00 par pas de 15 minutes
    const times = [];
    const today = new Date();
    const monday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() + 1, 8, 0, 0);
    let time = new Date(monday);
    let dayTime = new Date(time);
    for (let i = 0; i < 6; i++){
      while(dayTime <= new Date(time.getTime() + 10 * 60 * 60 * 1000)){
        times.push(this.datePipe.transform(dayTime, 'HH:mm'));
        dayTime = new Date(dayTime.getTime() + 15 * 60000);
      }
      time = new Date(time.getTime() + 24 * 60 * 60 * 1000);
      dayTime = new Date(dayTime.getTime() + 24 * 60 * 60 * 1000);
    }
    return times as string[];
  }

  generateWeek(weekDate: Date): Week {
    if (this.centerId == null) {
      throw new Error('Center id is null');
    }
    const monday = new Date(weekDate.getFullYear(), weekDate.getMonth(), weekDate.getDate() - weekDate.getDay() + 1, 8, 0, 0);
    const friday = new Date(weekDate.getFullYear(), weekDate.getMonth(), weekDate.getDate() - weekDate.getDay() + 5, 18, 0, 0);
    const week: Week = { start: monday, end: friday, days: [] };
    this.reservationService.getReservations(monday.getTime(), friday.getTime(), this.centerId).subscribe((data: any) => {
      const reservations: number[] = data;
      const days = [];
      let date = new Date(monday);
      while (date <= friday) {
        const availableTimes = this.generateAvailableTimes(date, reservations);
        days.push({ date: new Date(date), availableTimes });
        date = new Date(date.getTime() + 24 * 60 * 60 * 1000);
      }
      week.days = days;
    });
    return week;
  }

  // retourne un array de string de la forme HH:mm allant de 8:00 à 18:00 par pas de 15 minutes et ne contenant pas les heures déjà réservées
  generateAvailableTimes(date: Date, reservations: number[]): string[] { 
    const reservedTimes = reservations
      .filter(reservation => new Date(reservation).getDate() === date.getDate())
      .map(reservation => this.datePipe.transform(reservation, 'HH:mm'));
    return this.times.filter(time => !reservedTimes.includes(time));
  }

  reserve(date: Date, time: string): void {
    let reservationDate = new Date(date.getTime() + (parseInt(time.split(':')[0]) - 8) * 60 * 60 * 1000 + parseInt(time.split(':')[1]) * 60 * 1000);
    if(!confirm(`Voulez-vous réserver le ${this.datePipe.transform(reservationDate, 'EEEE dd/MM/yyyy')} à ${time}?`)){
      return;
    }
    if(this.centerId == null){
      throw new Error('Center id is null');
    }
    this.reservationService.makeReservation(parseInt(this.centerId), reservationDate.getTime()).subscribe({
      next : (data) => {
        alert('Réservation effectuée avec succès');
        this.router.navigate(['/reservations']);
      },
      error : (err) => {
        alert('Erreur lors de la réservation');
        console.log(err);
      }
    });
  }

  previousWeek(): void {
    const date = new Date(this.currentWeek.start.getTime() - 7 * 24 * 60 * 60 * 1000);
    if (date >= this.minDate) {
      this.currentWeek = this.generateWeek(date);
    }
  }

  nextWeek(): void {
    const date = new Date(this.currentWeek.start.getTime() + 7 * 24 * 60 * 60 * 1000);
    this.currentWeek = this.generateWeek(date);
  }
}