import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VaccinationCenterComponent } from './vaccination-center/vaccination-center.component';
import { VaccinationCenterListComponent } from './vaccination-center-list/vaccination-center-list.component';
import { IndexComponent } from './index/index.component';

const routes: Routes = [
  {path:"centers", component: VaccinationCenterListComponent},
  {path:"center/:id", component: VaccinationCenterComponent},
  {path:"", component: IndexComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
