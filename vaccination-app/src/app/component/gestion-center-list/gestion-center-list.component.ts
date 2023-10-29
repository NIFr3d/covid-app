import { Component } from '@angular/core';
import { VaccinationCenter } from 'src/app/entities/vaccination-center';
import { CenterService } from 'src/app/service/center.service';

@Component({
  selector: 'app-gestion-center-list',
  templateUrl: './gestion-center-list.component.html',
  styleUrls: ['./gestion-center-list.component.scss']
})
export class GestionCenterListComponent {

  constructor(private centerService : CenterService) { }

  centers!: VaccinationCenter[];

  filteredCenters!: VaccinationCenter[];

  searchText: string = "";

  ngOnInit(): void {
    this.centerService.getAllVaccinationCenters().subscribe((centers) => {
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
    this.centerService.deleteVaccinationCenter(id).subscribe(() => {
      this.ngOnInit();
    });
  }
}
