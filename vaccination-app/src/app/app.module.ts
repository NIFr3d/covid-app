import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule} from '@angular/material/card';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule} from '@angular/material/input';
import { MatIconModule} from '@angular/material/icon';
import { MatMenuModule} from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list'

import { AppComponent } from './app.component';
import { VaccinationCenterComponent } from './component/vaccination-center/vaccination-center.component';
import { FormsModule } from '@angular/forms';
import { VaccinationCenterListComponent } from './component/vaccination-center-list/vaccination-center-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { ContactComponent } from './component/contact/contact.component';
import { RegisterComponent } from './component/register/register.component';
import { ProfileComponent } from './component/profile/profile.component';
import { ErrorComponent } from './component/error/error.component';
import { GestionPanelComponent } from './component/gestion-panel/gestion-panel.component';
import { GestionReservationListComponent } from './component/gestion-reservation-list/gestion-reservation-list.component';
import { GestionCenterListComponent } from './component/gestion-center-list/gestion-center-list.component';
import { GestionUserListComponent } from './component/gestion-user-list/gestion-user-list.component';
import { GestionCenterEditComponent } from './component/gestion-center-edit/gestion-center-edit.component';
import { GestionCenterAddComponent } from './component/gestion-center-add/gestion-center-add.component';

@NgModule({
  declarations: [
    AppComponent,
    VaccinationCenterComponent,
    VaccinationCenterListComponent,
    HomeComponent,
    HomeComponent,
    LoginComponent,
    ContactComponent,
    RegisterComponent,
    ProfileComponent,
    ErrorComponent,
    GestionPanelComponent,
    GestionReservationListComponent,
    GestionCenterListComponent,
    GestionUserListComponent,
    GestionCenterEditComponent,
    GestionCenterAddComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatMenuModule,
    MatSidenavModule,
    MatListModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
