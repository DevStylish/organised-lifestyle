import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { BackendService } from '../../services/backend.service';
import { Escuela } from '../interfaces/escuela.interface';
import { Tareas } from '../interfaces/tareas.interface';
import { User } from '../interfaces/user.interface';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  // Información de usuario
  userInfo!: User;
  schoolarInfo!: Escuela;
  tareas: Tareas[] = [];
  numTareasPendientes: Number = 0;
  numTareasFinalizadas: number = 0;
  porcentajeTareasFinalizadas: number = 0;

  // Variables para la fecha
  fechaActual = new Date();
  fechaActualString: string = '';

  // Variables para crear tareas
  nombreTarea: String = '';
  descripcionTarea: String = '';
  fechaFin: any = '';
  horaFin: any = '';
  cursoRef: String = '';

  constructor(private router: Router, private backendService: BackendService) {}

  ngOnInit(): void {
    let userInfoSession = localStorage.getItem('userInfo');
    let isLogged = localStorage.getItem('isLogged');
    if (userInfoSession === null || userInfoSession === undefined) {
      this.backendService.redirectLogin();
    } else {
      this.userInfo = JSON.parse(userInfoSession || '');
      let username = this.userInfo.username;
      let password = this.userInfo.password;

      this.tareas = [];

      this.comprobarLogin(username, password);

      this.obtenerTareas(username);

      this.comprobarSchoolar(username);

      this.fechaActualString = `${this.fechaActual.getDate()}-${
        this.fechaActual.getMonth() + 1
      }-${this.fechaActual.getFullYear()}`;
    }
  }

  comprobarLogin(username: string, password: string) {
    this.backendService.loginUser(username, password).subscribe({
      next: (res) => {},
      error: (err) => {
        this.backendService.logout();
      },
    });
  }

  comprobarSchoolar(username: string) {
    if (this.userInfo.isSchoolarMember === true) {
      this.backendService.getEscuelaByUsername(username).subscribe({
        next: (res) => {
          this.schoolarInfo = res;

          localStorage.setItem(
            'schoolarInfo',
            JSON.stringify(this.schoolarInfo)
          );

          if (this.schoolarInfo.isStudent) {
            this.backendService
              .getTareasBySchoolarCourse(this.schoolarInfo.schoolarCourse)
              .subscribe({
                next: (res) => {
                  res.forEach((tarea) => {
                    this.tareas.push(tarea);
                  });
                },
                complete: () => {
                  this.numTareasFinalizadas = 0;
                  this.numTareasPendientes = this.obtenerNumTareasPendientes(
                    this.tareas
                  );
                  this.porcentajeTareasFinalizadas =
                    (this.numTareasFinalizadas * 100) / this.tareas.length;

                  document.getElementById('barra-progreso')!.style.width =
                    this.porcentajeTareasFinalizadas + '%';
                },
              });
          }
        },
        error: (err) => {
          console.error(err);
          this.backendService.logout();
        },
        complete: () => {},
      });
    }
  }

  obtenerTareas(username: string) {
    this.backendService.getTareasByUsername(username).subscribe({
      next: (res) => {
        res.forEach((tarea) => {
          this.tareas.push(tarea);
        });
      },
      complete: () => {
        this.numTareasFinalizadas = 0;
        this.numTareasPendientes = this.obtenerNumTareasPendientes(this.tareas);
        this.porcentajeTareasFinalizadas =
          (this.numTareasFinalizadas * 100) / this.tareas.length;

        document.getElementById('barra-progreso')!.style.width =
          this.porcentajeTareasFinalizadas + '%';
      },
    });
  }

  crearTarea(): void {
    if (this.nombreTarea != null) {
      let tarea = {};
      if (
        this.schoolarInfo !== null &&
        this.schoolarInfo !== undefined &&
        this.schoolarInfo.isTeacher
      ) {
        tarea = {
          username: this.userInfo.username,
          nombreTarea: this.nombreTarea,
          descripcion: this.descripcionTarea,
          fechaFin: this.fechaFin,
          horaFin: this.horaFin,
          cursoRef: this.cursoRef,
        };
      } else {
        tarea = {
          username: this.userInfo.username,
          nombreTarea: this.nombreTarea,
          descripcion: this.descripcionTarea,
          fechaFin: this.fechaFin,
          horaFin: this.horaFin,
        };
      }

      this.backendService.agregarTarea(tarea).subscribe({
        next: (res) => {},
        error: (err) => {
          this.backendService.logout();
        },
        complete: () => {
          this.tareas = [];
          this.comprobarSchoolar(this.userInfo.username);
          this.obtenerTareas(this.userInfo.username);
        },
      });

      this.cerrarTarea();
    }
  }

  editarTarea(_id: String): void {
    let tarea: Tareas = <Tareas>{};

    this.tareas.forEach((tareaInfo) => {
      if (tareaInfo._id === _id) {
        tarea = tareaInfo;
      }
    });

    if (this.nombreTarea != null) {
      let tareaUpdated = {
        _id: _id,
        username: tarea.username,
        nombreTarea: this.nombreTarea,
        descripcion: this.descripcionTarea,
        fechaFin: this.fechaFin,
        horaFin: this.horaFin,
        finalizado: tarea.finalizado,
        cursoRef: this.cursoRef,
        __v: tarea.__v + 1,
      };

      let username = this.userInfo.username;

      this.backendService.editarTarea(username, tareaUpdated).subscribe({
        next: (res) => {},
        error: (err) => {},
        complete: () => {
          this.tareas = [];
          if (this.schoolarInfo !== null || this.schoolarInfo !== undefined) {
            this.comprobarSchoolar(this.userInfo.username);
          }

          this.obtenerTareas(this.userInfo.username);
        },
      });

      this.cerrarTarea();
    }
  }

  comprobarInformacionTarea(tarea: Tareas): boolean {
    let tareaChecked = false;

    if (tarea.username === this.userInfo.username) {
      tareaChecked = tarea.finalizado;
    } else {
      if (tarea.alumnosFinalizados !== undefined) {
        tarea.alumnosFinalizados.forEach((alumnoFinalizado) => {
          if (alumnoFinalizado === this.userInfo.username) {
            tareaChecked = true;
          }
        });
      }
    }

    return tareaChecked;
  }

  marcarTarea(_id: string, valor: boolean): void {
    let tarea: Tareas = <Tareas>{};

    this.tareas.forEach((tareaInfo) => {
      if (tareaInfo._id === _id) {
        tarea = tareaInfo;
      }
    });

    let check = !valor;

    let alumnosFinalizadoTarea = tarea.alumnosFinalizados;

    if (tarea.username !== this.userInfo.username) {
      let alumnoAdded = false;

      for (let i = 0; i < tarea.alumnosFinalizados.length; i++) {
        if (tarea.alumnosFinalizados[i] === this.userInfo.username) {
          tarea.alumnosFinalizados.splice(i, 1);
          alumnoAdded = true;
        }
      }

      if (!alumnoAdded) {
        alumnosFinalizadoTarea.push(this.userInfo.username);
      }
    }

    let tareaUpdated = {
      _id: _id,
      username: tarea.username,
      nombreTarea: tarea.nombreTarea,
      descripcion: tarea.descripcion,
      fechaFin: tarea.fechaFin,
      horaFin: tarea.horaFin,
      finalizado: check,
      alumnosFinalizados: alumnosFinalizadoTarea,
      cursoRef: tarea.cursoRef,
      __v: tarea.__v + 1,
    };

    if (tarea.username !== this.userInfo.username) {
      tareaUpdated = {
        _id: _id,
        username: tarea.username,
        nombreTarea: tarea.nombreTarea,
        descripcion: tarea.descripcion,
        fechaFin: tarea.fechaFin,
        horaFin: tarea.horaFin,
        finalizado: valor,
        alumnosFinalizados: alumnosFinalizadoTarea,
        cursoRef: tarea.cursoRef,
        __v: tarea.__v + 1,
      };
    }

    if (this.userInfo.username !== tarea.username) {
      if (check) {
        let objSchoolar = this.schoolarInfo;
        objSchoolar.points = this.schoolarInfo.points + 10;
        this.backendService
          .indicarPuntos(this.userInfo.username, objSchoolar)
          .subscribe({
            next: (res) => {},
            error: (err) => {},
            complete: () => {},
          });
      } else {
        let objSchoolar = this.schoolarInfo;
        objSchoolar.points = this.schoolarInfo.points - 10;
        this.backendService
          .indicarPuntos(this.userInfo.username, objSchoolar)
          .subscribe({
            next: (res) => {},
            error: (err) => {},
            complete: () => {},
          });
      }
    }

    this.backendService.editarTarea(tarea.username, tareaUpdated).subscribe({
      next: (res) => {},
      error: (err) => {},
      complete: () => {
        this.ngOnInit();
      },
    });
  }

  eliminarTarea(_id: String) {
    let username = this.userInfo.username;

    this.backendService.eliminarTarea(username, _id).subscribe({
      next: (res) => {},
      error: (err) => {},
      complete: () => {
        this.tareas = [];
        this.comprobarSchoolar(username);
        this.obtenerTareas(username);
      },
    });
  }

  visualizarTarea(_id: string) {
    this.cerrarTarea();

    let tarea: Tareas = <Tareas>{};

    this.tareas.forEach((tareaInfo) => {
      if (tareaInfo._id === _id) {
        tarea = tareaInfo;
      }
    });

    this.nombreTarea = tarea.nombreTarea;
    this.descripcionTarea = tarea.descripcion;
    this.fechaFin = tarea.fechaFin;
    this.horaFin = tarea.horaFin;
    if (this.schoolarInfo !== undefined && this.schoolarInfo.isTeacher) {
      this.cursoRef = tarea.cursoRef;
    }
  }

  obtenerNumTareasPendientes(tareas: Tareas[]): Number {
    let numTareas = tareas.length;
    tareas.forEach((tarea) => {
      if (
        (tarea.finalizado && tarea.username === this.userInfo.username) ||
        (tarea.alumnosFinalizados !== undefined &&
          tarea.alumnosFinalizados.includes(this.userInfo.username))
      ) {
        this.numTareasFinalizadas++;
        numTareas--;
      }
    });

    return numTareas;
  }

  cerrarTarea() {
    this.nombreTarea = '';
    this.descripcionTarea = '';
    this.fechaFin = '';
    this.horaFin = '';
    this.cursoRef = '';
  }

  logout(): void {
    this.backendService.logout();
  }
}
