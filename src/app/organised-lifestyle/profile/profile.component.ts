import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../interfaces/user.interface';

import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  userInfo!: User;
  fechaActual = new Date();
  fechaActualString: string = '';

  // Variables del profile
  username: string = '';
  email: string = '';
  password: string = '';
  repeatPassword: string = '';

  errorMsg: string = '';
  successMsg: string = '';

  constructor(private router: Router, private backendService: BackendService) {}

  ngOnInit(): void {
    this.errorMsg = '';
    this.successMsg = '';
    let userInfo = localStorage.getItem('userInfo');
    let isLogged = localStorage.getItem('isLogged');
    if (userInfo === undefined) {
      this.backendService.redirectLogin();
    } else {
      this.userInfo = JSON.parse(localStorage.getItem('userInfo') || '');
      this.username = this.userInfo.username;
      this.email = this.userInfo.email;
      this.fechaActualString = `${this.fechaActual.getDay()}-${this.fechaActual.getMonth()}-${this.fechaActual.getFullYear()}`;
    }
  }

  guardarCambios(): void {
    this.errorMsg = '';
    this.successMsg = '';

    if (this.username !== '') {
      if (this.email !== '') {
        let userUpdated = <User>{
          _id: this.userInfo._id,
          username: this.username,
          email: this.email,
          password: this.userInfo.password,
          __v: this.userInfo.__v + 1,
        };
        const comprobadorEspacios = /\s/;
        if (this.password.length !== 0) {
          if (
            comprobadorEspacios.test(this.password) == false &&
            comprobadorEspacios.test(this.repeatPassword) === false
          ) {
            if (this.password === this.repeatPassword) {
              userUpdated = <User>{
                _id: this.userInfo._id,
                username: this.username,
                email: this.email,
                password: this.password,
                __v: this.userInfo.__v + 1,
              };

              this.enviarDatos(userUpdated);
            } else {
              this.errorMsg =
                'Las contraseñas no coinciden, vuelva a introducirlas';
            }
          } else {
            this.errorMsg = 'La contraseña no puede contener espacios';
          }
        } else {
          this.enviarDatos(userUpdated);
        }
      } else {
        this.errorMsg = 'El email no puede estar vacio';
      }
    } else {
      this.errorMsg = 'El usuario no puede estar vacio';
    }
  }

  enviarDatos(userUpdated: any) {
    this.backendService
      .actualizarDatosUsuario(
        this.userInfo.username,
        this.userInfo.password,
        userUpdated
      )
      .subscribe({
        next: (res) => {},
        error: (err) => {},
        complete: () => {
          this.successMsg = 'Cambios realizados, espere y vuelva a logarse';
          const deslogar = setInterval(() => {
            this.backendService.logout();
            clearInterval(deslogar);
          }, 3000);
        },
      });
  }

  logout(): void {
    this.backendService.logout();
  }
}
