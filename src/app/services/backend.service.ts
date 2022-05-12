import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../organised-lifestyle/interfaces/user.interface';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  private user!: User;

  constructor(private http: HttpClient, private router: Router) {}

  loginUser(username: String, password: String): any {
    let url: string = `${environment.apiUrl}/${username}/${password}`;

    this.http.get<User>(url).subscribe((userObtained) => {
      this.user = userObtained;
    });

    return this.user;
  }

  registerUser(userInfo: any): boolean {
    let isUserInsert: boolean = false;

    try {
      let username = userInfo.username;
      let password = userInfo.password;
      let email = userInfo.email;
    } catch (error) {
      console.error('Error creando el usuario');
    }

    return isUserInsert;
  }

  agregarTarea(username: String, password: String, tarea: any): boolean {
    let url: string = `${environment.apiUrl}/${username}/${password}`;

    let isTareaUploaded: boolean = true;

    let todoworks = {
      tarea: [tarea],
    };

    this.http
      .patch(url, {
        headers: new HttpHeaders({
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers':
            'Origin, X-Requested-With, Content-Type, Accept, authorization',
          'Content-Type': 'Application/json',
        }),
        todoworks,
      })
      .subscribe(
        (data) => console.log('Tarea insertada', data),
        (error) => (isTareaUploaded = false)
      );

    return isTareaUploaded;
  }

  agregarTareaLocalStorage(
    username: String,
    password: String,
    tarea: any
  ): boolean {
    let isTareaInsert = false;

    if (this.loginUser(username, password) !== null) {
      let todoworksLocal = JSON.parse(
        localStorage.getItem('todoworksLocal') || ''
      );

      if (todoworksLocal !== null && todoworksLocal !== undefined) {
        let tareas = todoworksLocal;

        let tareaObject = {
          _id: tareas.length,
          nombreTarea: tarea.nombreTarea,
          descripcion: tarea.descripcion,
          fechaFin: tarea.fechaFin,
          horaFin: tarea.horaFin,
        };

        tareas.push(tareaObject);

        let tareasString = JSON.stringify(tareas);

        localStorage.setItem('todoworksLocal', tareasString);

        console.log(tareas);
        isTareaInsert = true;
      }
    }

    return isTareaInsert;
  }

  eliminarTareaLocalStorage(username: String, password: String, _id: String) {
    let isTareaDelete = false;
    if (this.loginUser(username, password) !== null) {
      let todoworksLocal = JSON.parse(
        localStorage.getItem('todoworksLocal') || ''
      );

      if (todoworksLocal !== null && todoworksLocal !== undefined) {
        let tareas = todoworksLocal;
        tareas.splice(_id, 1);

        for (let i = 0; i < tareas.length; i++) {
          tareas[i]._id = i;
        }

        let tareasString = JSON.stringify(tareas);

        localStorage.setItem('todoworksLocal', tareasString);

        isTareaDelete = true;
      }
    }

    return isTareaDelete;
  }

  redirectLogin() {
    this.router.navigate(['inicio']);
  }

  logout() {
    if (
      localStorage.getItem('userInfo') !== null &&
      localStorage.getItem('isLogged') !== null
    ) {
      localStorage.removeItem('userInfo');
      localStorage.removeItem('isLogged');
    }

    this.redirectLogin();
  }
}
