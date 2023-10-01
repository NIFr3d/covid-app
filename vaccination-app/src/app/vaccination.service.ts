import { Injectable } from '@angular/core';
import { VaccinationCenter } from './vaccination-center/vaccination-center';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VaccinationService {
  constructor(private httpClient : HttpClient) { }


  getCenterById(id: number): Observable<VaccinationCenter> {
    return this.httpClient.get<VaccinationCenter>("/api/public/center/"+id);
  }

  getVaccinationCentersByCity(city:string) : Observable<VaccinationCenter[]> {
    return this.httpClient.get<VaccinationCenter[]>("/api/public/centers/getByCity",{
      params:{
        "city": city
      }
    });
  }

  getAllVaccinationCenters() : Observable<VaccinationCenter[]> {
    return this.httpClient.get<VaccinationCenter[]>("/api/public/centers");
  }
}
