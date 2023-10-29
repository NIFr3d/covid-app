import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { VaccinationCenter } from 'src/app/entities/vaccination-center';
import { ActivatedRoute } from '@angular/router';
import { CenterService } from 'src/app/service/center.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-vaccination-center',
  templateUrl: './vaccination-center.component.html',
  styleUrls: ['./vaccination-center.component.scss']
})
export class VaccinationCenterComponent implements OnInit{


  center!: VaccinationCenter;
  isLoggedIn = this.storageService.isLoggedIn();

  constructor(private route: ActivatedRoute, 
              private centerService : CenterService,
              private storageService : StorageService) { }

  ngOnInit(): void {  
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.centerService.getCenterById(id).subscribe((center) => {
      this.center = center;
    });
  }
}
