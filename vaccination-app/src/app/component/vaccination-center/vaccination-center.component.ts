import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { VaccinationCenter } from './vaccination-center';
import { ActivatedRoute } from '@angular/router';
import { VaccinationService } from '../../service/vaccination.service';

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
    this.vaccinationService.getCenterById(id).subscribe((center) => {
      this.center = center;
    });
  }

  clearName(center: VaccinationCenter) {
    center.nom = '';
  }
  isNameNotEmpty(center: VaccinationCenter) {
    return center.nom.length != 0;
  }
  delete() {
    delete this.center;
  }
}
