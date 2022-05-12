import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { BackendService } from '../../services/backend.service';
import { User } from '../interfaces/user.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  titulo: String = 'Login';
  user!: User;
  error: String = '';

  username: string = '';
  password: string = '';

  constructor(private router: Router, private backendService: BackendService) {}

  ngOnInit(): void {
    this.checkIsLogin();
    this.error = '';
  }

  login(): void {
    const comprobadorEspacios = /\s/;

    if (
      !comprobadorEspacios.test(this.username) &&
      !comprobadorEspacios.test(this.password) &&
      this.username.length !== 0 &&
      this.password.length !== 0
    ) {
      this.user = this.backendService.loginUser(this.username, this.password);
      console.log(this.user);
      if (this.user !== undefined && this.user !== null) {
        localStorage.setItem('userInfo', JSON.stringify(this.user));
        localStorage.setItem('isLogged', 'true');
        localStorage.setItem('todoworksLocal', JSON.stringify([]));
        setInterval(() => {
          this.router.navigate(['inicio']);
        }, 3000);
      } else {
        this.error = 'Error al introducir el usuario o contraseña';
      }
    }
  }

  checkIsLogin(): void {
    if (
      localStorage.getItem('isLogged') === 'true' &&
      localStorage.getItem('userInfo') !== undefined &&
      localStorage.getItem('userInfo') !== null
    ) {
      this.backendService.redirectLogin();
    }
  }
}
