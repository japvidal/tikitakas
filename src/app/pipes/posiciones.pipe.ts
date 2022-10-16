import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'posiciones'
})
export class PosicionesPipe implements PipeTransform {


 valordevuelto='';
 
 transform(value: string, datosposiciones:any[], idioma:string): string {
  if (value != undefined) {
    this.valordevuelto = value;
    if (value.indexOf('RE') > -1 && idioma == 'es') {
      this.valordevuelto = 'RESERVA';
    } else{
      for (let elemento of datosposiciones){
        if (elemento.id == value && elemento.idioma == idioma){
          this.valordevuelto = elemento.descripcion;
        }
      }
    }
  }
  return this.valordevuelto;
 }
}

