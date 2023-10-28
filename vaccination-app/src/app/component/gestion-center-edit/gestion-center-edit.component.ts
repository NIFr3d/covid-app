import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VaccinationCenter } from 'src/app/entities/vaccination-center';
import { VaccinationService } from 'src/app/service/vaccination.service';

@Component({
  selector: 'app-gestion-center-edit',
  templateUrl: './gestion-center-edit.component.html',
  styleUrls: ['./gestion-center-edit.component.scss']
})
export class GestionCenterEditComponent {

  constructor(private vaccinationService : VaccinationService,
              private route: ActivatedRoute) { }

  center!: VaccinationCenter;

  saveError : boolean = false;
  errorMessage : string = "";

  ngOnInit (): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.vaccinationService.getCenterById(id).subscribe((center) => {
      this.center = center;
    });
  }

  onSubmit() : void {
    this.vaccinationService.saveVaccinationCenter(this.center).subscribe(() => {
      window.location.href = "/management/centers";
    });
  }
}
