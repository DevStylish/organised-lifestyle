import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend.service';
import { Escuela } from '../interfaces/escuela.interface';
import { User } from '../interfaces/user.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  nombre: string = '';
  apellidos: string = '';
  username: string = '';
  email: string = '';
  password: string = '';
  repeatPassword: string = '';
  isSchoolar: boolean = false;
  schoolName: string = '';
  schoolarCourse: string = '';
  isStudent: string = '';
  errorMessage: string = '';

  constructor(private service: BackendService) {}

  ngOnInit(): void {
    this.username = '';
    this.email = '';
    this.password = '';
    this.repeatPassword = '';
    this.isSchoolar = false;
    this.schoolName = '';
    this.schoolarCourse = '';
    this.isStudent = '';
  }

  registrar(): void {
    this.errorMessage = '';
    if (
      this.username !== '' &&
      this.email !== '' &&
      this.password !== '' &&
      this.repeatPassword !== ''
    ) {
      let user = this.crearJSONUser();

      let schoolar = {};
      if (this.isSchoolar) {
        schoolar = this.crearJSONEscuela();
      }

      this.service.registerUser(user).subscribe({
        next: (res) => {
          if (this.isSchoolar) {
            this.service.registerEscuela(schoolar).subscribe({
              next: (res) => {
                this.service.redirectLogin();
              },
              error: (err) => {
                this.errorMessage =
                  'Error al intentar guardar la escuela, pruebe a modificarlo en su perfil';
              },
            });
          }

          if (!this.isSchoolar) {
            this.service.redirectLogin();
          }
        },
        error: (err) => {
          this.errorMessage = 'Error al intentar guardar el usuario';
        },
      });
    } else {
      this.errorMessage = 'Error, no se ha introducido todos los datos';
    }
  }

  checkSchool(): boolean {
    let isSchoolCorrect = true;

    if (this.schoolName !== '' && this.schoolarCourse !== '') {
      if (this.isStudent === '') {
        this.errorMessage = 'No se ha seleccionado un grupo';
        isSchoolCorrect = false;
      }
    } else {
      isSchoolCorrect = false;
    }

    return isSchoolCorrect;
  }

  crearJSONUser(): any {
    let userInfo = {
      username: this.username,
      password: this.password,
      email: this.email,
      isSchoolarMember: this.isSchoolar,
    };

    console.log(userInfo);

    return userInfo;
  }

  crearJSONEscuela(): any {
    let schoolarInfo = {};
    if (this.isStudent === 'profesor') {
      schoolarInfo = {
        username: this.username,
        schoolName: this.schoolName,
        isTeacher: true,
        isStudent: false,
        schoolarCourse: this.schoolarCourse,
      };
    } else if (this.isStudent === 'estudiante') {
      schoolarInfo = {
        username: this.username,
        schoolName: this.schoolName,
        isTeacher: false,
        isStudent: true,
        schoolarCourse: this.schoolarCourse,
      };
    }

    console.log(schoolarInfo);

    return schoolarInfo;
  }
}
