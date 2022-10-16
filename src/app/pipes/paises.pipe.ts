import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'paises'
})
export class PaisesPipe implements PipeTransform {


  valordevuelto='';
 
  transform(value: string, datoscountries:any[]): string {
    this.valordevuelto = value;
    if (value == 'EN'){
      this.valordevuelto = 'Inglaterra';
    }else if (value == 'SCO'){
      this.valordevuelto = 'Escocia';
    }else if (value == 'WAL'){
    this.valordevuelto = 'País de Gales';
    }else{
      for (let elemento of datoscountries){
         if (elemento.cca2 == value){
          this.valordevuelto = elemento.translations.spa.common;
        }
    
      }
    }

    return this.valordevuelto;
  }
}
