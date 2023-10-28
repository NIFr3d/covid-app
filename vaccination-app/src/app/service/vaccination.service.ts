import { Injectable } from '@angular/core';
import { VaccinationCenter } from '../entities/vaccination-center';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VaccinationService {
  constructor(private httpClient : HttpClient) { }


  getCenterById(id: number): Observable<VaccinationCenter> {
    return this.httpClient.get<VaccinationCenter>("/api/center/"+id);
  }

  getVaccinationCentersByCity(city:string) : Observable<VaccinationCenter[]> {
    return this.httpClient.get<VaccinationCenter[]>("/api/centers/getByCity",{
      params:{
        "city": city
      }
    });
  }

  getAllVaccinationCenters() : Observable<VaccinationCenter[]> {
    return this.httpClient.get<VaccinationCenter[]>("/api/centers");
  }

  saveVaccinationCenter(vaccinationCenter: VaccinationCenter) : Observable<VaccinationCenter> {
    return this.httpClient.post<VaccinationCenter>("/api/editCenter", vaccinationCenter);
  }

  deleteVaccinationCenter(id: number) : Observable<void> {
    return this.httpClient.delete<void>("/api/deleteCenter/"+id);
  }

  addVaccinationCenter(vaccinationCenter: VaccinationCenter) : Observable<VaccinationCenter> {
    return this.httpClient.post<VaccinationCenter>("/api/addCenter", vaccinationCenter);
  }
}
