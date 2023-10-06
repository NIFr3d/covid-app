import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  credentials = {email: '', password: ''};

  constructor(private AuthService: AuthService) {
  }

  onSubmit() {
    this.AuthService.login(this.credentials.email, this.credentials.password).subscribe(() => {
      console.log('Login successful');
    }, (err) => {
      console.error(err);
    });
  }
}
