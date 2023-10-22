import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { StorageService } from '../../service/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  credentials = {email: '', password: ''};
  loginError?: boolean;
  errorMessage?: string;

  constructor(private AuthService: AuthService, private StorageService : StorageService) {
  }

  onSubmit() {
    if(this.credentials.email === '' || this.credentials.password === '') {
      this.loginError = true;
      this.errorMessage = "L'email et le mot de passe sont obligatoires";
      return;
    }
    this.AuthService.login(this.credentials.email, this.credentials.password).subscribe({
      next : data => {
        this.StorageService.saveUser(data);
        location.replace('/');
      },
      error : error => {
        this.loginError = true;
        this.errorMessage = error;

      }
    });
  }
}
