import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'utils'
})
export class UtilsPipe implements PipeTransform {

  transform( value:string , tipo:string): unknown {
    if (tipo == 'age'){
       var fecha:Date = new Date(value);
       var timeDiff = Math.abs(Date.now() - fecha.getTime());
       return Math.floor((timeDiff / (1000 * 3600 * 24)) / 365);
    }else{
      return '';
    }  
  }

}
