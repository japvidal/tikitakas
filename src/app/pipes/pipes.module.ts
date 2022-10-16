import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NoimagePipe } from './noimage.pipe';
import { PosicionesPipe } from './posiciones.pipe';
import { PaisesPipe } from './paises.pipe';
import { UtilsPipe } from './utils.pipe';

@NgModule({
  declarations: [
    NoimagePipe,
    PosicionesPipe,
    PaisesPipe,
    UtilsPipe  
  ],
  imports: [
    CommonModule
  ],
  exports:[
    NoimagePipe,
    PosicionesPipe,
    PaisesPipe,
    UtilsPipe  
  ]
})
export class PipesModule { }
