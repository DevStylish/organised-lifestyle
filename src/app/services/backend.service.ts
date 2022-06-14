import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../organised-lifestyle/interfaces/user.interface';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Escuela } from '../organised-lifestyle/interfaces/escuela.interface';
import { Observable } from 'rxjs';
import { Tareas } from '../organised-lifestyle/interfaces/tareas.interface';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  private user!: User;

  constructor(private http: HttpClient, private router: Router) {}

  loginUser(username: String, password: String): Observable<User> {
    let url: string = `${environment.apiUrl}user/${username}/${password}/`;

    return this.http.get<User>(url);
  }

  registerUser(userInfo: any): Observable<User> {
    let urlUser: string = `${environment.apiUrl}user`;

    return this.http.post<User>(urlUser, userInfo);
  }

  actualizarDatosUsuario(
    username: string,
    password: string,
    userUpdated: User
  ): Observable<User> {
    let urlUser: string = `${environment.apiUrl}user/${username}/${password}`;

    return this.http.patch<User>(urlUser, userUpdated);
  }

  registerEscuela(schoolarInfo: any): Observable<Escuela> {
    let urlEscuela: string = `${environment.apiUrl}escuela`;

    return this.http.post<Escuela>(urlEscuela, schoolarInfo);
  }

  getEscuelaByUsername(username: string): Observable<Escuela> {
    let url: string = `${environment.apiUrl}escuela/${username}/`;

    return this.http.get<Escuela>(url);
  }

  getTareasByUsername(username: string): Observable<Tareas[]> {
    let url: string = `${environment.apiUrl}tareas/${username}`;

    return this.http.get<Tareas[]>(url);
  }

  getTareasBySchoolarCourse(schoolarCourse: string): Observable<Tareas[]> {
    let url: string = `${environment.apiUrl}tareas/curso/${schoolarCourse}`;

    return this.http.get<Tareas[]>(url);
  }

  agregarTarea(tarea: any): Observable<Tareas> {
    let url: string = `${environment.apiUrl}tareas/`;

    return this.http.post<Tareas>(url, tarea);
  }

  editarTarea(username: String, tarea: any): Observable<Tareas> {
    let url: string = `${environment.apiUrl}tareas/${tarea._id}/${username}`;

    return this.http.patch<Tareas>(url, tarea);
  }

  indicarPuntos(username: String, schoolar: any): Observable<Escuela> {
    let url: string = `${environment.apiUrl}escuela/${username}`;

    return this.http.patch<Escuela>(url, schoolar);
  }

  redirectLogin() {
    this.router.navigate(['login']);
  }

  redirectoToMain() {
    this.router.navigate(['inicio']);
  }

  eliminarTarea(username: string, _id: String): Observable<Tareas> {
    let url: string = `${environment.apiUrl}tareas/${_id}/${username}`;

    return this.http.delete<Tareas>(url);
  }

  logout() {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('isLogged');
    localStorage.removeItem('schoolarInfo');

    this.redirectLogin();
  }
}
