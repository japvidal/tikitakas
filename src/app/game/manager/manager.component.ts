import { Component, OnInit } from '@angular/core';
import { FutfemserviceService } from 'src/app/services/persistencia/futfem.service';
import { MatchdayPlayer } from 'src/app/model/entities/matchdayplayer';
import { Team } from 'src/app/model/entities/team';
import { UtilsPipe } from 'src/app/pipes/utils.pipe';
import { ApifutfemService } from 'src/app/services/apiservice/apifutfem.service';
import { Referee } from 'src/app/model/entities/referee';
import { MatchdayTeam } from 'src/app/model/entities/matchdayteam';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css'],
  providers: [ UtilsPipe]
})
export class ManagerComponent implements OnInit {

  equipoLocal:MatchdayPlayer[] = [];
  equipoVisitante:MatchdayPlayer[] = [];
  local:MatchdayTeam = new MatchdayTeam();
  visitante:MatchdayTeam = new MatchdayTeam();
  arbitro:Referee = new Referee();
  datosPosiciones: any[] = [];
  datosCountries:any[] = [];
  colorMain = this.futfemService.colorMain;
  colorBack = this.futfemService.colorBack;
  colorField = this.futfemService.colorField;
  local1:MatchdayPlayer = new MatchdayPlayer(0);
  local2:MatchdayPlayer = new MatchdayPlayer(0);
  local3:MatchdayPlayer = new MatchdayPlayer(0);
  local4:MatchdayPlayer = new MatchdayPlayer(0);
  local5:MatchdayPlayer = new MatchdayPlayer(0);
  local6:MatchdayPlayer = new MatchdayPlayer(0);
  local7:MatchdayPlayer = new MatchdayPlayer(0);
  local8:MatchdayPlayer = new MatchdayPlayer(0);
  local9:MatchdayPlayer = new MatchdayPlayer(0);
  local10:MatchdayPlayer = new MatchdayPlayer(0);
  local11:MatchdayPlayer = new MatchdayPlayer(0);
  local12:MatchdayPlayer = new MatchdayPlayer(0);
  local13:MatchdayPlayer = new MatchdayPlayer(0);
  local14:MatchdayPlayer = new MatchdayPlayer(0);
  local15:MatchdayPlayer = new MatchdayPlayer(0);
  local16:MatchdayPlayer = new MatchdayPlayer(0);
  local17:MatchdayPlayer = new MatchdayPlayer(0);
  local18:MatchdayPlayer = new MatchdayPlayer(0);
  local19:MatchdayPlayer = new MatchdayPlayer(0);
  local20:MatchdayPlayer = new MatchdayPlayer(0);
  local21:MatchdayPlayer = new MatchdayPlayer(0);
  local22:MatchdayPlayer = new MatchdayPlayer(0);
  local23:MatchdayPlayer = new MatchdayPlayer(0);
  local24:MatchdayPlayer = new MatchdayPlayer(0);
  local25:MatchdayPlayer = new MatchdayPlayer(0);

 visitante1:MatchdayPlayer = new MatchdayPlayer(0);
 visitante2:MatchdayPlayer = new MatchdayPlayer(0);
 visitante3:MatchdayPlayer = new MatchdayPlayer(0);
 visitante4:MatchdayPlayer = new MatchdayPlayer(0);
 visitante5:MatchdayPlayer = new MatchdayPlayer(0);
 visitante6:MatchdayPlayer = new MatchdayPlayer(0);
 visitante7:MatchdayPlayer = new MatchdayPlayer(0);
 visitante8:MatchdayPlayer = new MatchdayPlayer(0);
 visitante9:MatchdayPlayer = new MatchdayPlayer(0);
 visitante10:MatchdayPlayer = new MatchdayPlayer(0);
 visitante11:MatchdayPlayer = new MatchdayPlayer(0);
 visitante12:MatchdayPlayer = new MatchdayPlayer(0);
 visitante13:MatchdayPlayer = new MatchdayPlayer(0);
 visitante14:MatchdayPlayer = new MatchdayPlayer(0);
 visitante15:MatchdayPlayer = new MatchdayPlayer(0);
 visitante16:MatchdayPlayer = new MatchdayPlayer(0);
 visitante17:MatchdayPlayer = new MatchdayPlayer(0);
 visitante18:MatchdayPlayer = new MatchdayPlayer(0);
 visitante19:MatchdayPlayer = new MatchdayPlayer(0);
 visitante20:MatchdayPlayer = new MatchdayPlayer(0);
 visitante21:MatchdayPlayer = new MatchdayPlayer(0);
 visitante22:MatchdayPlayer = new MatchdayPlayer(0);
 visitante23:MatchdayPlayer = new MatchdayPlayer(0);
 visitante24:MatchdayPlayer = new MatchdayPlayer(0);
 visitante25:MatchdayPlayer = new MatchdayPlayer(0);




  constructor(private utilPipe: UtilsPipe,private futfemService:FutfemserviceService,private apiServices:ApifutfemService) { }

  ngOnInit(): void {
    this.apiServices.getMatchdayTeamLocal()
    .subscribe( (equipoLocal : any) => {
      if(equipoLocal.length > 0){
        console.log('cargando equipo local');
        this.local = equipoLocal[0];
      }
    });
    this.apiServices.getMatchdayTeamVisitante()
    .subscribe( (equipoVisitante : any) => {
      if(equipoVisitante.length > 0){
        console.log('cargando equipo visitante');
        this.visitante = equipoVisitante[0];
      }
    });
    this.local = this.futfemService.equipoLocal;
    this.visitante = this.futfemService.equipoVisitante;
    this.cargarEquipos();
    this.getReferee();
  }

  getReferee(){
    this.apiServices.getReferees()
    .subscribe( (arbitros : any) => {
      if(arbitros.length > 0){
        let indexArbitro = Math.floor(Math.random() * (arbitros.length - 0)) + 0;
        this.futfemService.arbitro = arbitros[indexArbitro];
        this.arbitro = arbitros[indexArbitro];
      }
    });

    this.apiServices.getCountries( )
    .subscribe( (datosCountries : any) => {
      this.datosCountries = datosCountries;
      console.log(this.datosCountries);
    });
  }

  cargarEquipos(){
    this.equipoLocal = this.futfemService.equipoMatchdayLocal;
    this.equipoVisitante = this.futfemService.equipoMatchdayVisitante;
    console.log('cargarequipos:'+this.equipoLocal);
  }
  cargarEquipos_back(){
    this.equipoLocal = [new MatchdayPlayer(0)];
    this.equipoVisitante= [new MatchdayPlayer(0)];      
    this.apiServices.getMatchdayPlayersLocalByPosition('GK')
    .subscribe( (mpl : any) => {
      if(mpl.length > 0){
        this.cargarMatchdayPlayer(this.local1, mpl[0]);
        this.equipoLocal.push(this.local1);
      }
    });
    this.apiServices.getMatchdayPlayersLocalByPosition('RD')
    .subscribe( (mpl : any) => {
      if(mpl.length > 0){
        this.cargarMatchdayPlayer(this.local2, mpl[0]);
        this.equipoLocal.push(this.local2);
      }
    });
    this.apiServices.getMatchdayPlayersLocalByPosition('RCD')
    .subscribe( (mpl : any) => {
      if(mpl.length > 0){
        this.cargarMatchdayPlayer(this.local3, mpl[0]);
        this.equipoLocal.push(this.local3);
      }
    });
    this.apiServices.getMatchdayPlayersLocalByPosition('CDF')
    .subscribe( (mpl : any) => {
      if(mpl.length > 0){
        this.cargarMatchdayPlayer(this.local4, mpl[0]);
        this.equipoLocal.push(this.local4);
      }
    });
    this.apiServices.getMatchdayPlayersLocalByPosition('LCD')
    .subscribe( (mpl : any) => {
      if(mpl.length > 0){
        this.cargarMatchdayPlayer(this.local5, mpl[0]);
        this.equipoLocal.push(this.local5);
      }
    });
    this.apiServices.getMatchdayPlayersLocalByPosition('LD')
    .subscribe( (mpl : any) => {
      if(mpl.length > 0){
        this.cargarMatchdayPlayer(this.local6, mpl[0]);
        this.equipoLocal.push(this.local6);
      }
    });
    this.apiServices.getMatchdayPlayersLocalByPosition('MCD')
    .subscribe( (mpl : any) => {
      if(mpl.length > 0){
        this.cargarMatchdayPlayer(this.local7, mpl[0]);
        this.equipoLocal.push(this.local7);
      }
    });
    this.apiServices.getMatchdayPlayersLocalByPosition('RM')
    .subscribe( (mpl : any) => {
      if(mpl.length > 0){
        this.cargarMatchdayPlayer(this.local8, mpl[0]);
        this.equipoLocal.push(this.local8);
      }
    });
    this.apiServices.getMatchdayPlayersLocalByPosition('RMC')
    .subscribe( (mpl : any) => {
      if(mpl.length > 0){
        this.cargarMatchdayPlayer(this.local9, mpl[0]);
        this.equipoLocal.push(this.local9);
      }
    });
    this.apiServices.getMatchdayPlayersLocalByPosition('MC')
    .subscribe( (mpl : any) => {
      if(mpl.length > 0){
        this.cargarMatchdayPlayer(this.local10, mpl[0]);
        this.equipoLocal.push(this.local10);
      }
    });
    this.apiServices.getMatchdayPlayersLocalByPosition('LMC')
    .subscribe( (mpl : any) => {
      if(mpl.length > 0){
        this.cargarMatchdayPlayer(this.local11, mpl[0]);
        this.equipoLocal.push(this.local11);
      }
    });

    this.apiServices.getMatchdayPlayersLocalByPosition('LM')
    .subscribe( (mpl : any) => {
      if(mpl.length > 0){
        this.cargarMatchdayPlayer(this.local12, mpl[0]);
        this.equipoLocal.push(this.local12);
      }
    });

    this.apiServices.getMatchdayPlayersLocalByPosition('MCO')
    .subscribe( (mpl : any) => {
      if(mpl.length > 0){
        this.cargarMatchdayPlayer(this.local13, mpl[0]);
        this.equipoLocal.push(this.local13);
      }
    });
    this.apiServices.getMatchdayPlayersLocalByPosition('RW')
    .subscribe( (mpl : any) => {
      if(mpl.length > 0){
        this.cargarMatchdayPlayer(this.local14, mpl[0]);
        this.equipoLocal.push(this.local14);
      }
    });
    this.apiServices.getMatchdayPlayersLocalByPosition('FFW')
    .subscribe( (mpl : any) => {
      if(mpl.length > 0){
        this.cargarMatchdayPlayer(this.local15, mpl[0]);
        this.equipoLocal.push(this.local15);
      }
    });
    this.apiServices.getMatchdayPlayersLocalByPosition('FW')
    .subscribe( (mpl : any) => {
      if(mpl.length > 0){
        this.cargarMatchdayPlayer(this.local16, mpl[0]);
        this.equipoLocal.push(this.local16);
      }
    });
    this.apiServices.getMatchdayPlayersLocalByPosition('LW')
    .subscribe( (mpl : any) => {
      if(mpl.length > 0){
        this.cargarMatchdayPlayer(this.local17, mpl[0]);
        this.equipoLocal.push(this.local17);
      }
    });

    this.apiServices.getMatchdayPlayersLocalByPosition('RE1')
    .subscribe( (mpl : any) => {
      if(mpl.length > 0){
        this.cargarMatchdayPlayer(this.local18, mpl[0]);
      }
    });
    this.apiServices.getMatchdayPlayersLocalByPosition('RE2')
    .subscribe( (mpl : any) => {
      if(mpl.length > 0){
        this.cargarMatchdayPlayer(this.local19, mpl[0]);
      }
    });
    this.apiServices.getMatchdayPlayersLocalByPosition('RE3')
    .subscribe( (mpl : any) => {
      if(mpl.length > 0){
        this.cargarMatchdayPlayer(this.local20, mpl[0]);
      }
    });
    this.apiServices.getMatchdayPlayersLocalByPosition('RE4')
    .subscribe( (mpl : any) => {
      if(mpl.length > 0){
        this.cargarMatchdayPlayer(this.local21, mpl[0]);
      }
    });
    this.apiServices.getMatchdayPlayersLocalByPosition('RE5')
    .subscribe( (mpl : any) => {
      if(mpl.length > 0){
        this.cargarMatchdayPlayer(this.local22, mpl[0]);
      }
    });
    this.apiServices.getMatchdayPlayersLocalByPosition('RE6')
    .subscribe( (mpl : any) => {
      if(mpl.length > 0){
        this.cargarMatchdayPlayer(this.local23, mpl[0]);
      }
    });
    this.apiServices.getMatchdayPlayersLocalByPosition('RE7')
    .subscribe( (mpl : any) => {
      if(mpl.length > 0){
        this.cargarMatchdayPlayer(this.local24, mpl[0]);
      }
    });

    this.apiServices.getMatchdayPlayersVisitanteByPosition('GK')
    .subscribe( (mpl : any) => {
      if(mpl.length > 0){
        this.cargarMatchdayPlayer(this.visitante1, mpl[0]);
        this.equipoVisitante.push(this.visitante1);
      }
    });
    this.apiServices.getMatchdayPlayersVisitanteByPosition('RD')
    .subscribe( (mpl : any) => {
      if(mpl.length > 0){
        this.cargarMatchdayPlayer(this.visitante2, mpl[0]);
        this.equipoVisitante.push(this.visitante2);
      }
    });
    this.apiServices.getMatchdayPlayersVisitanteByPosition('RCD')
    .subscribe( (mpl : any) => {
      if(mpl.length > 0){
        this.cargarMatchdayPlayer(this.visitante3, mpl[0]);
        this.equipoVisitante.push(this.visitante3);
      }
    });
    this.apiServices.getMatchdayPlayersVisitanteByPosition('CDF')
    .subscribe( (mpl : any) => {
      if(mpl.length > 0){
        this.cargarMatchdayPlayer(this.visitante4, mpl[0]);
        this.equipoVisitante.push(this.visitante4);
      }
    });
    this.apiServices.getMatchdayPlayersVisitanteByPosition('LCD')
    .subscribe( (mpl : any) => {
      if(mpl.length > 0){
        this.cargarMatchdayPlayer(this.visitante5, mpl[0]);
        this.equipoVisitante.push(this.visitante5);
      }
    });
    this.apiServices.getMatchdayPlayersVisitanteByPosition('LD')
    .subscribe( (mpl : any) => {
      if(mpl.length > 0){
        this.cargarMatchdayPlayer(this.visitante6, mpl[0]);
        this.equipoVisitante.push(this.visitante6);
      }
    });
    this.apiServices.getMatchdayPlayersVisitanteByPosition('MCD')
    .subscribe( (mpl : any) => {
      if(mpl.length > 0){
        this.cargarMatchdayPlayer(this.visitante7, mpl[0]);
        this.equipoVisitante.push(this.visitante7);
      }
    });
    this.apiServices.getMatchdayPlayersVisitanteByPosition('RM')
    .subscribe( (mpl : any) => {
      if(mpl.length > 0){
        this.cargarMatchdayPlayer(this.visitante8, mpl[0]);
        this.equipoVisitante.push(this.visitante8);
      }
    });
    this.apiServices.getMatchdayPlayersVisitanteByPosition('RMC')
    .subscribe( (mpl : any) => {
      if(mpl.length > 0){
        this.cargarMatchdayPlayer(this.visitante9, mpl[0]);
        this.equipoVisitante.push(this.visitante9);
      }
    });
    this.apiServices.getMatchdayPlayersVisitanteByPosition('MC')
    .subscribe( (mpl : any) => {
      if(mpl.length > 0){
        this.cargarMatchdayPlayer(this.visitante10, mpl[0]);
        this.equipoVisitante.push(this.visitante10);
      }
    });
    this.apiServices.getMatchdayPlayersVisitanteByPosition('LMC')
    .subscribe( (mpl : any) => {
      if(mpl.length > 0){
        this.cargarMatchdayPlayer(this.visitante11, mpl[0]);
        this.equipoVisitante.push(this.visitante11);
      }
    });

    this.apiServices.getMatchdayPlayersVisitanteByPosition('LM')
    .subscribe( (mpl : any) => {
      if(mpl.length > 0){
       this.cargarMatchdayPlayer(this.visitante12, mpl[0]);
       this.equipoVisitante.push(this.visitante12);
      }
    });

    this.apiServices.getMatchdayPlayersVisitanteByPosition('MCO')
    .subscribe( (mpl : any) => {
      if(mpl.length > 0){
        this.cargarMatchdayPlayer(this.visitante13, mpl[0]);
        this.equipoVisitante.push(this.visitante13);
      }
    });
    this.apiServices.getMatchdayPlayersVisitanteByPosition('RW')
    .subscribe( (mpl : any) => {
      if(mpl.length > 0){
        this.cargarMatchdayPlayer(this.visitante14, mpl[0]);
        this.equipoVisitante.push(this.visitante14);
      }
    });
    this.apiServices.getMatchdayPlayersVisitanteByPosition('FFW')
    .subscribe( (mpl : any) => {
      if(mpl.length > 0){
        this.cargarMatchdayPlayer(this.visitante15, mpl[0]);
        this.equipoVisitante.push(this.visitante15);
      }
    });
    this.apiServices.getMatchdayPlayersVisitanteByPosition('FW')
    .subscribe( (mpl : any) => {
      if(mpl.length > 0){
        this.cargarMatchdayPlayer(this.visitante16, mpl[0]);
        this.equipoVisitante.push(this.visitante16);
      }
    });
    this.apiServices.getMatchdayPlayersVisitanteByPosition('LW')
    .subscribe( (mpl : any) => {
      if(mpl.length > 0){
        this.cargarMatchdayPlayer(this.visitante17, mpl[0]);
        this.equipoVisitante.push(this.visitante17);
      }
    });
    this.apiServices.getMatchdayPlayersVisitanteByPosition('RE1')
    .subscribe( (mpl : any) => {
      if(mpl.length > 0){
        this.cargarMatchdayPlayer(this.visitante18, mpl[0]);
      }
    });
    this.apiServices.getMatchdayPlayersVisitanteByPosition('RE2')
    .subscribe( (mpl : any) => {
      if(mpl.length > 0){
        this.cargarMatchdayPlayer(this.visitante19, mpl[0]);
      }
    });
    this.apiServices.getMatchdayPlayersVisitanteByPosition('RE3')
    .subscribe( (mpl : any) => {
      if(mpl.length > 0){
        this.cargarMatchdayPlayer(this.visitante20, mpl[0]);
      }
    });
    this.apiServices.getMatchdayPlayersVisitanteByPosition('RE4')
    .subscribe( (mpl : any) => {
      if(mpl.length > 0){
        this.cargarMatchdayPlayer(this.visitante21, mpl[0]);
      }
    });
    this.apiServices.getMatchdayPlayersVisitanteByPosition('RE5')
    .subscribe( (mpl : any) => {
      if(mpl.length > 0){
        this.cargarMatchdayPlayer(this.visitante22, mpl[0]);
      }
    });
    this.apiServices.getMatchdayPlayersVisitanteByPosition('RE6')
    .subscribe( (mpl : any) => {
      if(mpl.length > 0){
        this.cargarMatchdayPlayer(this.visitante23, mpl[0]);
      }
    });
    this.apiServices.getMatchdayPlayersVisitanteByPosition('RE7')
    .subscribe( (mpl : any) => {
      if(mpl.length > 0){
        this.cargarMatchdayPlayer(this.visitante24, mpl[0]);
      }
    });

  }

  cargarMatchdayPlayer(mp:MatchdayPlayer, jugador:MatchdayPlayer) {
    mp.id = jugador.id;
    mp.idPlayer = jugador.idPlayer;
    mp.idTeam = jugador.idTeam;
    mp.season = jugador.season;
    mp.dorsal = jugador.dorsal;
    mp.amarilla = jugador.amarilla;
    mp.roja = jugador.roja;
    mp.birthdate = jugador.birthdate;
    mp.country = jugador.country;
    mp.goles = jugador.goles;
    mp.faltas = jugador.faltas;
    mp.paradas = jugador.paradas;
    mp.idsquad = jugador.idsquad;
    mp.ataqueaereo = jugador.ataqueaereo;
    mp.ataquefaltas = jugador.ataquefaltas;
    mp.ataquepases = jugador.ataquepases;
    mp.ataquepenaltys = jugador.ataquepenaltys;
    mp.ataqueregate = jugador.ataqueregate;
    mp.ataqueremate = jugador.ataqueremate;
    mp.birthdate = jugador.birthdate;
    mp.country = jugador.country;
    mp.defaerea = jugador.defaerea;
    mp.defagresividad = jugador.defagresividad;
    mp.defanticipacion = jugador.defanticipacion;
    mp.defestrategia = jugador.defestrategia;
    mp.name = jugador.name;
    mp.nickname = jugador.nickname;
    mp.portero = jugador.portero;
    mp.resistencia = jugador.resistencia;
    mp.surname = jugador.surname;
    mp.totalmedia = jugador.totalmedia;
    mp.urlpic = jugador.urlpic;
    mp.position = jugador.position;
    mp.positionmatch = jugador.positionmatch;
    mp.velocidad = jugador.velocidad;
    mp.visionjuego = jugador.visionjuego;
   }

   sustitucionLocal(mp:MatchdayPlayer, event:any){
    let mp2:MatchdayPlayer = this.equipoLocal[event.currentTarget.selectedIndex];
    if (mp2.id > 0){
      let posicion:string = mp2.positionmatch;
      mp2.positionmatch= mp.positionmatch;
      mp.positionmatch=posicion;
      this.apiServices.editMatchdayPlayerLocal(mp).subscribe(
        response => {
          this.apiServices.editMatchdayPlayerLocal(mp2).subscribe(
            response => {
              this.cargarEquipos();
              event.currentTarget.style.visibility = "hidden";
            });
      });
     }
    }

   sustitucionVisitante(mp:MatchdayPlayer, event:any){
    let mp2:MatchdayPlayer = this.equipoVisitante[event.currentTarget.selectedIndex];
    if (mp2.id > 0){
      let posicion:string = mp2.positionmatch;
      mp2.positionmatch= mp.positionmatch;
      mp.positionmatch=posicion;
      this.apiServices.editMatchdayPlayerVisitante(mp).subscribe(
        response => {
          this.apiServices.editMatchdayPlayerVisitante(mp2).subscribe(
            response => {
              this.cargarEquipos();
              event.currentTarget.style.visibility = "hidden";
             });
      });
     }
    }

    start(){
      this.apiServices.jugar(0);
    }
  }
