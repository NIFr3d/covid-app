import { Component } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  constructor(private authService : AuthService) { }

  registerError = false;
  errorMessage?: string;

  samePasswordError = false;
  passwordLengthError = false;

  telephoneError = false;

  credentials: any = { email: '', password: '', password2:'' , nom: '', prenom: '', telephone: '' };

  onSubmit() : void {
    if(this.credentials.email === '' || this.credentials.password === '' || this.credentials.nom === '' || this.credentials.prenom === '' || this.credentials.telephone === '') {
      this.registerError = true;
      this.errorMessage = "Tous les champs sont obligatoires";
      return;
    }
    this.authService.register(this.credentials.email, this.credentials.password, this.credentials.nom, this.credentials.prenom, this.credentials.telephone).subscribe({
      next : data => {
        location.replace('/login');
      },
      error : error => {
        this.registerError = true;
        this.errorMessage = error;
      }
    });
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
}
