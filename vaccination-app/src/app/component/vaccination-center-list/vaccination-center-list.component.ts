import { Component, OnInit } from '@angular/core';
import { VaccinationCenter } from '../../entities/vaccination-center';
import { VaccinationService } from '../../service/vaccination.service';

@Component({
  selector: 'app-vaccination-center-list',
  templateUrl: './vaccination-center-list.component.html',
  styleUrls: ['./vaccination-center-list.component.scss']
})
export class VaccinationCenterListComponent implements OnInit{

  constructor(private vaccinationService : VaccinationService) { }

  centers!: VaccinationCenter[];

  ngOnInit(): void {
    this.vaccinationService.getAllVaccinationCenters().subscribe((centers) => {
      this.centers = centers;
    });
  }
}
