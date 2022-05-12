export interface User {
  _id: string;
  username: string;
  password: string;
  email: string;
  todoworks: JSON;
  schoolar: Schoolar;
}

export interface Schoolar {
  schoolarName: string;
  isTeacher: boolean;
  isStudent: boolean;
  schoolarCourse: string;
}
