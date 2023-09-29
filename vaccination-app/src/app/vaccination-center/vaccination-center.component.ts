import { Component } from '@angular/core';
import { VaccinationCenter } from './vaccination-center';

@Component({
  selector: 'app-vaccination-center',
  templateUrl: './vaccination-center.component.html',
  styleUrls: ['./vaccination-center.component.scss']
})
export class VaccinationCenterComponent {

  center: VaccinationCenter = {
    id: 1,
    name: 'Hopital de Metz',
    address: 'Rue de Metz',
    postalCode: '57000',
    city: 'Metz'
  };

  constructor() { }

  ngOnInit(): void {  
  }

}
