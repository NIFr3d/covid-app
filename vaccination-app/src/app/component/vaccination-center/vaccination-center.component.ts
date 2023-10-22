import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { VaccinationCenter } from '../../entities/vaccination-center';
import { ActivatedRoute } from '@angular/router';
import { VaccinationService } from '../../service/vaccination.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vaccination-center',
  templateUrl: './vaccination-center.component.html',
  styleUrls: ['./vaccination-center.component.scss']
})
export class VaccinationCenterComponent implements OnInit{


  center!: VaccinationCenter;

  constructor(private route: ActivatedRoute, 
              private vaccinationService : VaccinationService,
              private router: Router) { }

  ngOnInit(): void {  
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.vaccinationService.getCenterById(id).subscribe((center) => {
      this.center = center;
    });
  }
}
