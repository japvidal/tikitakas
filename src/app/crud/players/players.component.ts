import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FutfemserviceService } from '../../services/persistencia/futfem.service';
import { ApifutfemService } from '../../services/apiservice/apifutfem.service';
import { Player } from '../../model/entities/player';
import { UtilsPipe } from 'src/app/pipes/utils.pipe';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css'],
  providers: [DatePipe, UtilsPipe]
})
export class PlayersComponent implements OnInit {

  forma : FormGroup;
  buscar: string = '';
  datosPlayers: any[] = [];
  datosPlayersAux: any[] = [];
  datosCountries: any[] = [];
  datosPosiciones: any[] = [];
  player: Player = new Player();
  totalplayers: number = 0;
  
  constructor(private datePipe: DatePipe, private utilPipe: UtilsPipe, private futfemservice:FutfemserviceService, private apiServices:ApifutfemService, private fb:FormBuilder, private translate:TranslateService) { 
    this.forma = this.fb.group({
       nombre  : ['', [ Validators.required, Validators.minLength(2) ]  ],
      apellido: ['', [ Validators.required, Validators.minLength(2) ]  ],
      alias: ['', [ Validators.required, Validators.minLength(2) ]  ],
      posicion: ['', [ Validators.required, Validators.minLength(2) ]  ],
      nacimiento: [ '', [ Validators.required ]  ],
      pais: ['', [ Validators.required, Validators.minLength(2) ]  ],
      velocidad: [60, [ Validators.required ]  ],
      resistencia: [60, [ Validators.required ]  ],
      defaerea: [60, [ Validators.required ]  ],
      defestrategia: [60, [ Validators.required ]  ],
      defagresividad: [60, [ Validators.required ]  ],
      defanticipacion: [60, [ Validators.required ]  ],
      visionjuego: [60, [ Validators.required ]  ],
      ataqueaereo: [60, [ Validators.required ]  ],
      ataqueregate: [60, [ Validators.required ]  ],
      ataquepases: [60, [ Validators.required ]  ],
      ataqueremate: [60, [ Validators.required ]  ],
      ataquefaltas: [60, [ Validators.required ]  ],
      ataquepenaltys: [60, [ Validators.required ]  ],
      portero: [60, [ Validators.required ]  ]
    });
  
  }

  ngOnInit(): void {

    this.limpiar();
    this.datosCountries = this.futfemservice.datosCountries;
    this.datosPosiciones = this.futfemservice.datosPosiciones;
    this.cargarJugadoras();
  }

  cargarJugadoras(){
    this.apiServices.getPlayersTemp( )
    .subscribe( (datosPlayers : any) => {
      
      for (let player of datosPlayers){
          player.birthdate = this.datePipe.transform(player.birthdate, 'yyyy-MM-dd');
          player.totalmedia = (player.velocidad + player.resistencia+player.defaerea+player.defestrategia+player.defagresividad+player.defanticipacion+player.visionjuego+player.ataquepases+player.ataqueremate+player.ataqueregate+player.ataqueaereo+player.ataquefaltas+player.ataquepenaltys+player.portero)/14
      }
      this.datosPlayers = datosPlayers;
      this.datosPlayersAux = this.datosPlayers;
      this.totalplayers = this.datosPlayers.length;
      console.log(this.datosPlayers);
    });
  }

  avg():void{
    this.player.totalmedia= (this.player.velocidad + this.player.resistencia+this.player.defaerea+this.player.defestrategia+this.player.defagresividad+this.player.defanticipacion+this.player.visionjuego+this.player.ataquepases+this.player.ataqueremate+this.player.ataqueregate+this.player.ataqueaereo+this.player.ataquefaltas+this.player.ataquepenaltys+this.player.portero)/14
  }

  guardar():void{
    console.log('ENTRANDO A GUARDAR:'+ this.forma.invalid);
    if ( this.forma.invalid ) {
      Swal.fire( this.translate.instant('ERROR'), this.translate.instant('FORM.ERROR.MESSAGE'), 'error' );
      return Object.values( this.forma.controls ).forEach( control => {          
        if ( control instanceof FormGroup ) {
            console.log(control.value);
            Object.values( control.controls ).forEach( control => control.markAsTouched() );
        } else {
          control.markAsTouched();
        }
      });
    }

    this.player.name = this.forma.get('nombre')?.value.toUpperCase();
    this.player.surname = this.forma.get('apellido')?.value.toUpperCase();
    this.player.nickname = this.forma.get('alias')?.value.toUpperCase();
    this.player.country = this.forma.get('pais')?.value;
    this.player.birthdate = this.forma.get('nacimiento')?.value;
    this.player.position = this.forma.get('posicion')?.value.toUpperCase();
    this.player.velocidad = this.forma.get('velocidad')?.value;
    this.player.resistencia = this.forma.get('resistencia')?.value;
    this.player.defaerea = this.forma.get('defaerea')?.value;
    this.player.defestrategia = this.forma.get('defestrategia')?.value;
    this.player.defagresividad = this.forma.get('defagresividad')?.value;
    this.player.defanticipacion = this.forma.get('defanticipacion')?.value;
    this.player.visionjuego = this.forma.get('visionjuego')?.value;
    this.player.ataqueaereo = this.forma.get('ataqueaereo')?.value;
    this.player.ataquefaltas = this.forma.get('ataquefaltas')?.value;
    this.player.ataquepases = this.forma.get('ataquepases')?.value;
    this.player.ataquepenaltys = this.forma.get('ataquepenaltys')?.value;
    this.player.ataqueregate = this.forma.get('ataqueregate')?.value;
    this.player.ataqueremate = this.forma.get('ataqueremate')?.value;
    this.player.portero = this.forma.get('portero')?.value;
      if (this.player.id == 0){
        this.apiServices.addPlayerTemp(this.player).subscribe(
          response => {
            this.reset();
            Swal.fire( this.translate.instant('FORM.OK.DONE'), this.translate.instant('FORM.OK.MESSAGE'), 'success' );
           })
      }else{
        this.apiServices.editPlayerTemp(this.player).subscribe(
          response => {
            this.reset();
            Swal.fire( this.translate.instant('FORM.OK.DONE'), this.translate.instant('FORM.OK.MESSAGEEDIT'), 'success' );
          })
      }

  }

    
  limpiar(): void{
    this.player = new Player();
    this.player.name = '';
    this.player.surname = '';
    this.player.nickname = '';
    this.player.birthdate = '';
    this.player.position = '';
    this.player.country = '';
    this.player.urlpic = '';
    this.player.id = 0;
    this.player.velocidad = 60;
    this.player.resistencia = 60;
    this.player.defestrategia = 60;
    this.player.defagresividad = 60;
    this.player.defanticipacion = 60;
    this.player.defaerea = 60;
    this.player.ataqueaereo = 60;
    this.player.ataqueregate = 60;
    this.player.ataquepases = 60;
    this.player.ataqueremate = 60;
    this.player.ataquefaltas = 60;
    this.player.ataquepenaltys = 60;
    this.player.visionjuego = 60;
    this.player.portero = 60;
    this.avg();

    this.forma.get("velocidad")?.setValue(60);
    this.forma.get("resistencia")?.setValue(60);
    this.forma.get("defestrategia")?.setValue(60);
    this.forma.get("defagresividad")?.setValue(60);
    this.forma.get("defanticipacion")?.setValue(60);
    this.forma.get("defaerea")?.setValue(60);
    this.forma.get("ataqueaereo")?.setValue(60);
    this.forma.get("ataqueregate")?.setValue(60);
    this.forma.get("ataquepases")?.setValue(60);
    this.forma.get("ataqueremate")?.setValue(60);
    this.forma.get("ataquefaltas")?.setValue(60);
    this.forma.get("ataquepenaltys")?.setValue(60);
    this.forma.get("visionjuego")?.setValue(60);
    this.forma.get("portero")?.setValue(60);

    this.buscar='';

  }

  buscador() {
    this.datosPlayers = this.datosPlayersAux;
      let datosPlayers2 : any[] = [];
      if (this.buscar.length > 2){
        for (let player of this.datosPlayers){
          if (player.name.toUpperCase().indexOf(this.buscar.toUpperCase()) > -1  || player.surname.toUpperCase().indexOf(this.buscar.toUpperCase()) > -1  || player.nickname.toUpperCase().indexOf(this.buscar.toUpperCase()) > -1  ){
            datosPlayers2.push(player);
          }
        }
        if (datosPlayers2.length > 0){
          this.datosPlayers = datosPlayers2;
        }
        if (datosPlayers2.length == 1){
          this.player = datosPlayers2[0];
        }
        this.totalplayers = this.datosPlayers.length;
        datosPlayers2 = [];
      }
  }

  selecciona(jugadora:Player){
    this.limpiar();
    this.player = jugadora;
  }

  reset(){
    this.forma.reset();
    this.limpiar();
    this.cargarJugadoras();
    this.datosCountries = this.futfemservice.datosCountries;
    this.datosPosiciones= this.futfemservice.datosPosiciones;
  }
}
