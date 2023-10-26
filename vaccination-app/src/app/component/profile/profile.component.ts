import { Component } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  credentials = { email: '', password: '', password2:'' , nom: '', prenom: '', telephone: '' };
  samePasswordError = false;
  passwordLengthError = false;
  telephoneError = false;
  saveError = false;
  errorMessage?: string;

  constructor(private authService : AuthService) {
    authService.getUserInfos().subscribe((data : any) => {
      this.credentials.email = data.email;
      this.credentials.nom = data.nom;
      this.credentials.prenom = data.prenom;
      this.credentials.telephone = data.telephone;
    });
    this.passVerif();
   }

  passVerif() : void {
    if(this.credentials.password !== this.credentials.password2) {
      this.samePasswordError = true;
    }
    else {
      this.samePasswordError = false;
    }
    if(this.credentials.password.length < 6) {
      this.passwordLengthError = true;
    }
    else {
      this.passwordLengthError = false;
    }
  }

  telephoneVerif() : void {
    var regex = new RegExp("^(0|\\+33|0033)[1-9][0-9]{8}$");
    if(!regex.test(this.credentials.telephone)) {
      this.telephoneError = true;
    }
    else {
      this.telephoneError = false;
    }
  }

  onSubmit () : void {
    this.passVerif();
    this.telephoneVerif();
    if(!this.samePasswordError && !this.passwordLengthError && !this.telephoneError) {
      this.authService.updateUserInfos(this.credentials.email, this.credentials.password, this.credentials.nom, this.credentials.prenom, this.credentials.telephone).subscribe({
        next : data => {
          location.replace('/profile');
        },
        error : error => {
          this.saveError = true;
          this.errorMessage = error;
        }
      });
    }
  }
}
