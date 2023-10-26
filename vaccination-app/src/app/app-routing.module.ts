import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VaccinationCenterComponent } from './component/vaccination-center/vaccination-center.component';
import { VaccinationCenterListComponent } from './component/vaccination-center-list/vaccination-center-list.component';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { ContactComponent } from './component/contact/contact.component';
import { RegisterComponent } from './component/register/register.component';
import { ProfileComponent } from './component/profile/profile.component';
import { ErrorComponent } from './component/error/error.component';
import { authGuard } from './auth.guard';

const routes: Routes = [
  {path:"centers", component: VaccinationCenterListComponent},
  {path:"center/:id", component: VaccinationCenterComponent},
  {path:"home", component: HomeComponent},
  {path:"login", component: LoginComponent},
  {path:"contact", component: ContactComponent},
  {path:"register", component: RegisterComponent},
  {path:"error", component: ErrorComponent},
  {path:"profile", component: ProfileComponent, canActivate: [authGuard]},
  {path:"", redirectTo:"/home", pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
