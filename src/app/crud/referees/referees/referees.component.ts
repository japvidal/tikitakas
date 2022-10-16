import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Referee } from 'src/app/model/entities/referee';
import { UtilsPipe } from 'src/app/pipes/utils.pipe';
import { ApifutfemService } from 'src/app/services/apiservice/apifutfem.service';
import { FutfemserviceService } from 'src/app/services/persistencia/futfem.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-referees',
  templateUrl: './referees.component.html',
  styleUrls: ['./referees.component.css'],
  providers: [ UtilsPipe]
})
export class RefereesComponent implements OnInit {

  forma : FormGroup;

  public buscar: string = '';
  
  totalReferees = 0;
  datosReferees: any[] = [];
  datosRefereesAux: any[] = [];
  datosCountries: any[] = [];
  referee: Referee = new Referee();

  constructor( private utilPipe: UtilsPipe, private apiServices:ApifutfemService, private fb: FormBuilder, private translate:TranslateService, private futfemservice:FutfemserviceService) {
    this.forma = this.fb.group({
      nombre  : ['', [ Validators.required, Validators.minLength(2) ]  ],
      apellido: ['', [ Validators.required, Validators.minLength(2) ]  ],
      pais: ['', [ Validators.required, Validators.minLength(2) ]  ],
      casero: ['0', [ Validators.required ]  ],
      tarjetero: ['0', [ Validators.required ]  ],
      valiente: ['0', [ Validators.required ]  ]
    });
  }
  
  ngOnInit(): void {
    this.reset();
  }

  reset(){
    this.limpiar();
    this.datosCountries = this.futfemservice.datosCountries;
    this.cargarArbitros();
  }

  cargarArbitros(){
    this.apiServices.getRefereesTemp( )
    .subscribe( (datosReferees : any) => {
      this.datosReferees = datosReferees;
      this.totalReferees = this.datosReferees.length;
      this.datosRefereesAux = this.datosReferees;
    });
  }

    limpiar(){
      this.referee.surname = '';
      this.referee.country= '';
      this.referee.id = 0;
      this.referee.name= '';
      this.referee.casero = 0;
      this.referee.tarjetero = 0;
      this.referee.valiente = 0;
      this.referee.urlpic = 0;
      return Object.values( this.forma.controls ).forEach( control => {          
        if ( control instanceof FormGroup ) {
          Object.values( control.controls ).forEach( control => control.markAsUntouched() );
          
        } else {
          control.markAsUntouched();
        }
      });

    }

    guardar(  ) {

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
      this.referee.name = this.forma.get('nombre')?.value.toUpperCase();
      this.referee.surname = this.forma.get("apellido")?.value.toUpperCase();
      this.referee.country = this.forma.get("pais")?.value;
      this.referee.tarjetero = this.forma.get("tarjetero")?.value;
      this.referee.casero = this.forma.get("casero")?.value;
      this.referee.valiente = this.forma.get("valiente")?.value;

      if (this.referee.id === 0){
        this.apiServices.addRefereeTemp(this.referee).subscribe(
          response => {
          this.reset();
          this.forma.reset();
          Swal.fire( this.translate.instant('FORM.OK.DONE'), this.translate.instant('FORM.OK.MESSAGE'), 'success' );
        });
      } else{
        this.apiServices.editRefereeTemp(this.referee).subscribe(
          response => {
          this.reset();
          this.forma.reset();
          Swal.fire( this.translate.instant('FORM.OK.DONE'), this.translate.instant('FORM.OK.MESSAGEEDIT'), 'success' );
        });
      }
    }

    selecciona(arbitro:Referee){
      this.referee = arbitro;
    }

    buscador(){

        this.datosReferees = this.datosRefereesAux;
          let datosReferees2 : any[] = [];
          if (this.buscar.length > 2){
            for (let referee of this.datosReferees){
              if (referee.name.indexOf(this.buscar.toUpperCase()) > -1  || referee.surname.indexOf(this.buscar.toUpperCase()) > -1 ){
                datosReferees2.push(referee);
              }
            }
            if (datosReferees2.length > 0){
              this.datosReferees = datosReferees2;
            }
            if (datosReferees2.length == 1){
              this.referee = datosReferees2[0];
            }
            this.totalReferees = this.datosReferees.length;
            datosReferees2 = [];
          }
      }
}
