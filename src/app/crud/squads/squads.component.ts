import { Component, OnInit } from '@angular/core';
import { ApifutfemService } from '../../services/apiservice/apifutfem.service';

import { Player } from '../../model/entities/player';
import { PlayerTeam } from '../../model/entities/playerteam';
import { Team } from 'src/app/model/entities/team';
import { Season } from 'src/app/model/entities/season';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';
import { FutfemserviceService } from 'src/app/services/persistencia/futfem.service';

@Component({
  selector: 'app-squads',
  templateUrl: './squads.component.html',
  styleUrls: ['./squads.component.css']
})
export class SquadsComponent implements OnInit {

  forma : FormGroup;
  step = 0;
  seasons: Season[] = [];
  season= '';
  teams: Team[] = [] ;
  team:Team =  new Team();
  players: Player[] = [];
  squads : PlayerTeam[] = [];
  datosCountries : [] = [];
  datosPosiciones : [] = [];  
  playerteam = new PlayerTeam();
  equipo = '';
  jugador: Player = new Player();
  jugadorarray : Player = new Player();
  equipoarray : Team = new Team();
  playersTeam: Player[] = [];
  totalplayers = 0;

  constructor(private translate: TranslateService, private apiServices:ApifutfemService, private futfemservice:FutfemserviceService, private fb:FormBuilder) {
    this.forma = this.fb.group({
      season: ['', [ Validators.required,Validators.minLength(4), Validators.maxLength(4) ]  ],
      equipo  : ['', [ Validators.required, Validators.minLength(1), Validators.min(1) ]  ],
      player: ['', [ Validators.required, Validators.minLength(1), Validators.min(1) ]  ],
      dorsal: ['', [ Validators.required,Validators.minLength(1), Validators.maxLength(2) ]  ]
   })
  }

  ngOnInit(): void {
    this.iniciar();
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  iniciar(){
    this.seasons = [new Season("2223","2022/2023"),new Season("2122","2021/2022"),new Season("2021","2020/2021"),new Season("1920","2019/2020"),new Season("1819","2018/2019")];
    this.teams = [{
      "id": 0,
      "name": "",
      "country": "",
      "nickname": "-------------------",
      "urlpic": "",
      "urlshirt": "",
      "established": new Date()
  }];
    this.players = [{
      "id": 0,
      "name": "",
      "surname": "",
      "nickname": "-----------------------",
      "position": "",
      "country": "",
      "urlpic": "",
      "velocidad": 60,
      "resistencia": 60,
      "defaerea": 60,
      "defestrategia": 60,
      "defagresividad": 60,
      "defanticipacion": 60,
      "visionjuego": 60,
      "ataquepases": 60,
      "ataqueremate": 60,
      "ataqueregate": 60,
      "ataqueaereo": 60,
      "ataquefaltas": 60,
      "ataquepenaltys": 60,
      "portero": 50,
      "birthdate": "1986-02-18T23:00:00.000+00:00",
      "dorsal":"",
      "idsquad":0,
      "totalmedia":0
  }];
    this.squads = [];
    this.playersTeam = [];

    this.limpiar();

  }
   
  limpiar(): void{
    this.playerteam.idTeam = 0;
     this.playerteam.season = "";
    this.playerteam.dorsal = "";
    this.playerteam.idPlayer = 0;
    this.playerteam.id = 0;
    this.playersTeam = [];
    this.season = "";
    this.jugador = new Player();
    this.team = new Team();
    this.forma.reset();
    this.setStep(0);
  }

  continueTeam(){
    this.playerteam.dorsal = "";
    this.playerteam.idPlayer = 0;
    this.jugador = new Player();
    this.playerteam.id = 0;
    this.cargarPlantillas(this.playerteam.idTeam, this.playerteam.season);
    this.forma.controls['player'].patchValue("0");
    this.forma.controls['player'].markAsUntouched();
    this.forma.controls['dorsal'].patchValue("");
    this.forma.controls['dorsal'].markAsUntouched();
    this.setStep(2);
  }

  choosePlayer(id:number){
    this.players.forEach(element => {
      this.jugadorarray = this.players.find(x=>x.id == element.id) ?? new Player();
      if (element.id == id ){
        this.jugador = element;
      }
    })
  }

  chooseTeam(id:number){
    this.teams.forEach(element => {
      this.equipoarray = this.teams.find(x=>x.id == element.id) ?? new Team();
      if (element.id == id ){
        this.team = element;
      }
    })
  }

  chooseNumber(){
    this.playerteam.dorsal = this.forma.get('dorsal')?.value;
  }

  eliminar(id:string){
    console.log('hola');
    if (id != '0'){ // se trata de un alta
      this.apiServices.removeSquadTemp(id).subscribe(
        response => {
          Swal.fire( this.translate.instant('FORM.OK.DONE'), this.translate.instant('FORM.OK.MESSAGEDEL'), 'success' );
          this.iniciar();
        })
    }
  }
  guardar():void{
    if ( this.forma.invalid ) {
      Swal.fire( this.translate.instant('FORM.ERROR.MESSAGE'), this.translate.instant('FORM.ERROR.DATA'), 'error' );
      return Object.values( this.forma.controls ).forEach( control => {          
        if ( control instanceof FormGroup ) {
          Object.values( control.controls ).forEach( control => control.markAsTouched() );
        } else {
          control.markAsTouched();
        }
      });
    }

    this.playerteam.season = this.forma.get('season')?.value;
    this.playerteam.idTeam = this.forma.get('equipo')?.value;
    this.playerteam.idPlayer = this.forma.get('player')?.value;
    this.playerteam.dorsal = this.forma.get('dorsal')?.value;
    console.log("enviar jugador-plantilla:" + this.playerteam.idPlayer + ", " + this.playerteam.idTeam + ", " + this.playerteam.dorsal  + ", " + this.playerteam.id ) ;

    if (this.playerteam.id == 0){ // se trata de un alta
      this.apiServices.addSquadTemp(this.playerteam).subscribe(
        response => {
          Swal.fire({
            title: this.translate.instant('FORM.OK.DONE'),
            icon: 'success',
            text: this.translate.instant('FORM.OK.MESSAGE'),
            showDenyButton: true,
            confirmButtonText: this.translate.instant('FORM.OK.CONTINUE.TEAM'),
            denyButtonText: this.translate.instant('FORM.OK.CLEAN'),
          }).then((result) => {
            if (result.isConfirmed) {
              this.continueTeam();
            } else if (result.isDenied) {
              this.iniciar();
            }
          })
        })
    }else{
        this.apiServices.editSquadTemp(this.playerteam).subscribe(
        response => {
          Swal.fire({
            title: this.translate.instant('FORM.OK.DONE'),
            icon: 'success',
            text: this.translate.instant('FORM.OK.MESSAGEEDIT'),
            showDenyButton: true,
            confirmButtonText: this.translate.instant('FORM.OK.CONTINUE.TEAM'),
            denyButtonText: this.translate.instant('FORM.OK.CLEAN'),
          }).then((result) => {
            if (result.isConfirmed) {
              this.continueTeam();
            } else if (result.isDenied) {
              this.iniciar();
            }
          })
        });
    }
  }

  cargarEquipos(ev: any){
    this.season = ev.source.selected.viewValue;

    this.playerteam.idTeam = 0;
    this.playersTeam = [];
    this.jugador = new Player();

    this.apiServices.getTeamsTemp( )
    .subscribe( (datosTeams : any) => {
      this.teams = this.teams.concat(datosTeams);
    });
  }

  cargarPlantillas(idTeam:number, season:String){
    //console.log('plantillas-->idTeam:'+this.forma.get('equipo')?.value + ' season:'+ this.forma.get('season')?.value);
    //console.log('plantillas-->idTeam:'+idTeam + ' season:'+ season);
    this.chooseTeam(idTeam);
    this.playersTeam = [];
    this.datosCountries = this.futfemservice.datosCountries;
    this.datosPosiciones= this.futfemservice.datosPosiciones;

    this.apiServices.getPlayersTemp( )
    .subscribe( (datosPlayers : any) => {
      this.players = datosPlayers;
      this.apiServices.getSquadsAllSeasonTemp(season)
      .subscribe( (datosPlayers : any) => {
        console.log(datosPlayers) ;
        this.totalplayers = datosPlayers.length;
        this.squads = datosPlayers;
        this.squads.forEach(element => {
          this.jugadorarray = this.players.find(x=>x.id == element.idPlayer) ?? new Player();
          if (element.idTeam == idTeam ){
            this.jugadorarray.dorsal = element.dorsal;
            this.jugadorarray.idsquad = element.id;
            this.playersTeam.push(this.jugadorarray);
          }
          this.players.splice(this.players.findIndex(x=>x.id == element.idPlayer),1);
        });
        this.totalplayers = this.playersTeam.length;
        console.log(this.players.length);
        console.log(this.totalplayers);
      });
    });
  }

}
