import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noimage'
})
export class NoimagePipe implements PipeTransform {

  imagendev = 'assets/images/noimage.png';

  transform(imagen: string, tipo: 'jugadora' | 'logo' | 'escudo' | 'camiseta' | 'arbitra'): string {
  /*
    if ( !imagen || imagen == '0' ){
      this.imagendev =  'assets/images/${ tipo }/0.png'; 
    }else{
      this.imagendev =  'assets/images/${ tipo }s/'+imagen+'.png'; 
    }
  */

    if (tipo == 'jugadora'){
      if ( !imagen || imagen == '0' ){
        this.imagendev =  'assets/images/jugadoras/0.png'; 
      }else{
        this.imagendev =  'assets/images/jugadoras/'+imagen+'.png'; 
      }
    } else if (tipo == 'escudo'){
      if ( !imagen || imagen == '0' ){
        this.imagendev =  'assets/images/escudos/noimage.png'; 
        
      }else{
        this.imagendev =  'assets/images/escudos/'+imagen+'.png'; 
      }
    } else if (tipo == 'camiseta'){
      if ( !imagen || imagen == '0' ){
        this.imagendev =  'assets/images/camisetas/noimage.png'; 
        
      }else{
        this.imagendev =  'assets/images/camisetas/'+imagen+'.png'; 
      }
    } else if (tipo == 'logo'){
      if ( !imagen || imagen == '0' ){
        this.imagendev =  'assets/images/logos/noimage.png'; 
        
      }else{
        this.imagendev =  'assets/images/logos/'+imagen+'.png'; 
      }
    } else if (tipo == 'arbitra'){
      if ( !imagen || imagen == '0' ){
        this.imagendev =  'assets/images/referees/0.png'; 
      }else{
        this.imagendev =  'assets/images/referees/'+imagen+'.png'; 
      }
    }
    return this.imagendev;
  }

  
}