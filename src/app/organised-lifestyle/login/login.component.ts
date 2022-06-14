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
  user: User = <User>{};
  error: String = '';
  msgCorrecto: String = '';

  username: string = '';
  password: string = '';
  stillLogged: boolean = false;

  constructor(private router: Router, private backendService: BackendService) {}

  ngOnInit(): void {
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
      this.backendService.loginUser(this.username, this.password).subscribe({
        next: (res) => {
          this.user = res;
        },
        error: (err) => {
          this.error = 'Error al introducir el usuario o contraseña';
        },
        complete: () => {
          if (this.user !== undefined && this.user !== null) {
            localStorage.setItem('userInfo', JSON.stringify(this.user));
            if (this.stillLogged) {
              localStorage.setItem('isLogged', 'true');
            }
            this.error = '';
            this.msgCorrecto = 'Login correcto, espere un momento';
            const redirect = setInterval(() => {
              this.router.navigate(['inicio']);
              clearInterval(redirect);
            }, 2000);
          }
        },
      });
    } else {
      this.error = 'No se han introducido todos los datos.';
    }
  }

  checkIsLogin(): void {
    if (
      localStorage.getItem('isLogged') === 'true' &&
      localStorage.getItem('userInfo') !== undefined &&
      localStorage.getItem('userInfo') !== null
    ) {
      this.backendService.redirectoToMain();
    }
  }
}
