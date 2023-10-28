import { Component } from '@angular/core';
import { VaccinationCenter } from 'src/app/entities/vaccination-center';
import { VaccinationService } from 'src/app/service/vaccination.service';

@Component({
  selector: 'app-gestion-center-list',
  templateUrl: './gestion-center-list.component.html',
  styleUrls: ['./gestion-center-list.component.scss']
})
export class GestionCenterListComponent {

  constructor(private vaccinationService : VaccinationService) { }

  centers!: VaccinationCenter[];

  filteredCenters!: VaccinationCenter[];

  searchText: string = "";

  ngOnInit(): void {
    this.vaccinationService.getAllVaccinationCenters().subscribe((centers) => {
      this.centers = centers;
      this.updateList();
    });
  }

  updateList() : void {
    this.filteredCenters = this.centers.filter((center) => {
      return center.nom.toLowerCase().includes(this.searchText?.toLowerCase() ?? '');
    });
  }

  deleteCenter(id: number) : void {
    if(!confirm("Êtes-vous sûr de vouloir supprimer ce centre de vaccination ?")) return;
    this.vaccinationService.deleteVaccinationCenter(id).subscribe(() => {
      this.ngOnInit();
    });
  }
}
