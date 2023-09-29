import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { VaccinationCenter } from './vaccination-center';
import { ActivatedRoute } from '@angular/router';
import { VaccinationService } from '../vaccination.service';

@Component({
  selector: 'app-vaccination-center',
  templateUrl: './vaccination-center.component.html',
  styleUrls: ['./vaccination-center.component.scss']
})
export class VaccinationCenterComponent implements OnInit{


  center?: VaccinationCenter;

  constructor(private route: ActivatedRoute, private vaccinationService : VaccinationService) { }

  ngOnInit(): void {  
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.center = this.vaccinationService.getCenterById(id);
  }

  clearName(center: VaccinationCenter) {
    center.name = '';
  }
  isNameNotEmpty(center: VaccinationCenter) {
    return center.name.length != 0;
  }
  delete() {
    delete this.center;
  }
}
