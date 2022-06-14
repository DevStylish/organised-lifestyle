export interface Tareas {
  _id: string;
  username: string;
  nombreTarea: string;
  descripcion: string;
  fechaFin: string;
  horaFin: string;
  finalizado: boolean;
  alumnosFinalizados: String[];
  cursoRef: string;
  __v: number;
}
