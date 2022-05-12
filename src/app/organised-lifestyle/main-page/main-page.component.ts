import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { BackendService } from '../../services/backend.service';
import { User } from '../interfaces/user.interface';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  userInfo!: User;
  fechaActual = new Date();
  fechaActualString: string = '';
  nombreTarea: String = '';
  descripcionTarea: String = '';
  fechaFin: any = '';
  horaFin: any = '';
  tareas: any;

  constructor(private router: Router, private backendService: BackendService) {}

  ngOnInit(): void {
    let userInfo = localStorage.getItem('userInfo');
    let isLogged = localStorage.getItem('isLogged');
    let todoworksLocal = localStorage.getItem('todoworksLocal');
    if (
      userInfo === undefined &&
      isLogged !== 'true' &&
      todoworksLocal === undefined
    ) {
      this.backendService.redirectLogin();
    } else {
      this.userInfo = JSON.parse(localStorage.getItem('userInfo') || '');
      this.tareas = JSON.parse(todoworksLocal || '');
      this.fechaActualString = `${this.fechaActual.getDay()}-${this.fechaActual.getMonth()}-${this.fechaActual.getFullYear()}`;
    }
  }

  crearTarea(): boolean {
    let isTareaUploded = false;
    if (this.nombreTarea != null) {
      console.log(this.nombreTarea);
      console.log(this.descripcionTarea);
      console.log(this.fechaFin);
      console.log(this.horaFin);

      let tarea = {
        nombreTarea: this.nombreTarea,
        descripcion: this.descripcionTarea,
        fechaFin: this.fechaFin,
        horaFin: this.horaFin,
      };

      console.log(localStorage.getItem('userInfo'));

      let userInfo = JSON.parse(localStorage.getItem('userInfo') || '');
      let username = userInfo.username;
      let password = userInfo.password;

      isTareaUploded = this.backendService.agregarTareaLocalStorage(
        username,
        password,
        tarea
      );

      this.tareas = JSON.parse(localStorage.getItem('todoworksLocal') || '');
    }

    return isTareaUploded;
  }

  eliminarTarea(_id: String) {
    let userInfo = JSON.parse(localStorage.getItem('userInfo') || '');
    let username = userInfo.username;
    let password = userInfo.password;

    if (
      this.backendService.eliminarTareaLocalStorage(username, password, _id)
    ) {
      console.log('Tarea eliminada');
    }
  }

  logout(): void {
    this.backendService.logout();
  }
}
