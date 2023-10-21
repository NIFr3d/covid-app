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

  constructor(private AuthService: AuthService, private StorageService : StorageService) {
  }

  onSubmit() {
    this.AuthService.login(this.credentials.email, this.credentials.password).subscribe({
      next : data => {
        this.StorageService.saveUser(data);
        console.log(data);
      },
      error : error => {
        console.log(error);
      }
    });
  }
}
