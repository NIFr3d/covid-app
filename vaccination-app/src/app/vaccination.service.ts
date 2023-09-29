import { Injectable } from '@angular/core';
import { VaccinationCenter } from './vaccination-center/vaccination-center';

@Injectable({
  providedIn: 'root'
})
export class VaccinationService {
  getCenterById(id: number): VaccinationCenter | undefined {
    return this.centers.find(center => center.id == id);
  }
  centers: VaccinationCenter[] = [{
    id: 1,
    name: 'Hopital de Metz',
    address: '12 Rue de la Vieille Boucherie',
    postalCode: '57000',
    city: 'Metz'
  },
  {
    id: 2,
    name: 'Hopital de Nancy',
    address: '29 Avenue du Maréchal de Lattre de Tassigny',
    postalCode: '54000',
    city: 'Nancy'
  }];

  constructor() { }
  getAllVaccinationCenters() {
    return this.centers;
  }
}
