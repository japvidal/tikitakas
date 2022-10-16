import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder,  FormGroup,Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Competition } from 'src/app/model/entities/competition';
import { ApifutfemService } from 'src/app/services/apiservice/apifutfem.service';
import { FutfemserviceService } from 'src/app/services/persistencia/futfem.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-competitions',
  templateUrl: './competitions.component.html',
  styleUrls: ['./competitions.component.css'],
  providers: [DatePipe]
})
export class CompetitionsComponent implements OnInit {

  forma : FormGroup;
  buscar: string = '';
  mensajeError = '';
  totalCompeticiones = 0;
  datosCompeticiones: any[] = [];
  datosCompeticiones2: any[] = [];
  datosCompeticionesAux: any[] = [];
  datosCountries: any[] = [];
  competition: Competition = new Competition();

  constructor( private datePipe : DatePipe, private futfemservice:FutfemserviceService, private apiServices:ApifutfemService,private fb: FormBuilder, private translate:TranslateService) {
    this.forma = this.fb.group({
      nombre  : ['', [ Validators.required, Validators.minLength(2) ]  ],
      federacion: ['', [ Validators.required, Validators.minLength(2) ]  ],
      pais: ['', [ Validators.required, Validators.minLength(2) ]  ],
      fundacion: [ '', [ Validators.required ]  ],
      logo: ['noimage' ]
    });
  }

  ngOnInit(): void {
    this.reset();
  }

  guardar():void{
    console.log('ENTRANDO A GUARDAR:'+ this.forma.invalid);
    if ( this.forma.invalid ) {
      return Object.values( this.forma.controls ).forEach( control => {          
        if ( control instanceof FormGroup ) {
          Object.values( control.controls ).forEach( control => control.markAsTouched() );
        } else {
          control.markAsTouched();
        }
      });
    }
    this.competition.name = this.forma.get('nombre')?.value.toUpperCase();
    this.competition.association = this.forma.get("federacion")?.value.toUpperCase();
    this.competition.country = this.forma.get("pais")?.value;
    this.competition.established = this.forma.get("fundacion")?.value;
    this.competition.urlpic = this.forma.get("logo")?.value;
    if (this.competition.id === 0){
      this.apiServices.addCompetitionTemp(this.competition).subscribe(
        response => {
          this.reset();
          this.forma.reset();
          Swal.fire( this.translate.instant('FORM.OK.DONE'), this.translate.instant('FORM.OK.MESSAGE'), 'success' );
        });
    } else{
      this.apiServices.editCompetitionTemp(this.competition).subscribe(
        response => {
          this.reset();
          this.forma.reset();
          Swal.fire( this.translate.instant('FORM.OK.DONE'), this.translate.instant('FORM.OK.MESSAGEEDIT'), 'success' );    
        });
      }
  }
    limpiar(){
      this.buscar='';
      this.competition.association = '';
      this.competition.country= '';
      this.competition.established= '01/01/2000';
      this.competition.id = 0;
      this.competition.name= '';
      this.competition.urlpic = '';
    }

    reset(){
      this.limpiar();
      this.cargarPaises();
      this.cargarCompeticiones();
    }

    cargarPaises(){
      this.apiServices.getCountries( )
      .subscribe( (datosCountries : any) => {
        this.datosCountries = datosCountries;
        this.futfemservice.datosCountries = datosCountries;
        console.log(datosCountries);
      });
    }

    cargarCompeticiones(){
      this.apiServices.getCompetitionsTemp( )
      .subscribe( (datosCompeticiones : any) => {
       for (let t1 of datosCompeticiones){
          t1.established = this.datePipe.transform(t1.established, 'yyyy-MM-dd');
        }
        this.datosCompeticiones = datosCompeticiones;
        this.datosCompeticionesAux = this.datosCompeticiones;
        this.totalCompeticiones = this.datosCompeticiones.length;
      });
    }

    buscador(){
      console.log('BUSCADOR:'+this.buscar);
      this.datosCompeticiones = this.datosCompeticionesAux;
        let datosCompeticiones2 : any[] = [];
        if (this.buscar.length > 2){
          for (let competicion of this.datosCompeticiones){
            if (competicion.name.indexOf(this.buscar.toUpperCase()) > -1  || competicion.association.indexOf(this.buscar.toUpperCase()) > -1 ){
              datosCompeticiones2.push(competicion);
            }
          }
          if (datosCompeticiones2.length > 0){
            this.datosCompeticiones = datosCompeticiones2;
          }
          if (datosCompeticiones2.length == 1){
            this.competition = datosCompeticiones2[0];
          }
          this.totalCompeticiones = this.datosCompeticiones.length;
          datosCompeticiones2 = [];
        }
    }

    selecciona(competicion:Competition){
      this.competition = competicion;
    }
}
