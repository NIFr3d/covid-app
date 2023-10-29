import { Injectable } from '@angular/core';
import { VaccinationCenter } from 'src/app/entities/vaccination-center';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CenterService {
  constructor(private httpClient : HttpClient) { }


  getCenterById(id: number): Observable<VaccinationCenter> {
    return this.httpClient.get<VaccinationCenter>("/api/center/getById/"+id);
  }

  getVaccinationCentersByCity(city:string) : Observable<VaccinationCenter[]> {
    return this.httpClient.get<VaccinationCenter[]>("/api/centers/getByCity",{
      params:{
        "city": city
      }
    });
  }

  getAllVaccinationCenters() : Observable<VaccinationCenter[]> {
    return this.httpClient.get<VaccinationCenter[]>("/api/center/getAll");
  }

  saveVaccinationCenter(vaccinationCenter: VaccinationCenter) : Observable<VaccinationCenter> {
    return this.httpClient.post<VaccinationCenter>("/api/center/editCenter", vaccinationCenter);
  }

  deleteVaccinationCenter(id: number) : Observable<void> {
    return this.httpClient.delete<void>("/api/center/deleteCenter/"+id);
  }

  addVaccinationCenter(vaccinationCenter: VaccinationCenter) : Observable<VaccinationCenter> {
    return this.httpClient.post<VaccinationCenter>("/api/center/addCenter", vaccinationCenter);
  }
}
