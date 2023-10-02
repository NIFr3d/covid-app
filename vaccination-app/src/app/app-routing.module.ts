import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VaccinationCenterComponent } from './component/vaccination-center/vaccination-center.component';
import { VaccinationCenterListComponent } from './component/vaccination-center-list/vaccination-center-list.component';
import { IndexComponent } from './component/index/index.component';

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
