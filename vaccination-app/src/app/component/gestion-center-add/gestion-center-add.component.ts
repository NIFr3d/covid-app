import { Component } from '@angular/core';
import { VaccinationCenter } from 'src/app/entities/vaccination-center';
import { VaccinationService } from 'src/app/service/vaccination.service';

@Component({
  selector: 'app-gestion-center-add',
  templateUrl: './gestion-center-add.component.html',
  styleUrls: ['./gestion-center-add.component.scss']
})
export class GestionCenterAddComponent {

  constructor(private vaccinationService : VaccinationService) { }

  saveError : boolean = false;
  errorMessage : string = "";

  center: VaccinationCenter = {adresse : "", ville: "", codePostal: "", nom: "", id: 0};

  onSubmit(): void {
    this.vaccinationService.addVaccinationCenter(this.center).subscribe({
      next: (data) => {
        location.replace('/management/centers');
      },
      error: (error) => {
        this.saveError = true;
        this.errorMessage = error.error.message;
      }
    });
  }
}
