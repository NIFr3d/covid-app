import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reservation } from '../entities/reservation';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private http : HttpClient) { }

  makeReservation(centreId: number, date : number){
    const body = { centreId, date };
    return this.http.post('/api/reservation/makeReservation', body);
  }

  getReservations(from : number, to : number, centreId : string){
    const body = { from, to, centreId };
    return this.http.get('/api/reservation/getReservationsFromTo', {params: body});
  }
  
  getReservationsByMedecinSearch(email : string, nom : string, prenom : string, centreId : number){
    const body = { email, nom, prenom, centreId };
    return this.http.get<Reservation[]>('/api/reservation/medecin/getReservationsByMedecinSearch', {params: body});
  }

  getReservationsByUser(){
    return this.http.get('/api/reservation/medecin/getReservationsByUser');
  }

  cancelReservation(id : number){
    return this.http.delete('/api/reservation/cancelReservation/'+id);
  }

  getReservationsForDayByCentre(date : Date, centreId : string): Observable<Reservation[]>{
    return this.http.get<Reservation[]>('/api/reservation/medecin/getReservationsForDayByCentre/'+centreId+'/'+date.getTime());
  }

  deleteReservation(id : string){
    return this.http.delete('/api/reservation/medecin/deleteReservation/'+id);
  }

  confirmVaccination(id : string){
    return this.http.post('/api/reservation/medecin/confirmVaccination/'+id, null);
  }
}
