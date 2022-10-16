import { Component } from '@angular/core';
import { ApifutfemService } from 'src/app/services/apiservice/apifutfem.service';
import { Team } from 'src/app/model/entities/team';
import { PlayerTeam } from 'src/app/model/entities/playerteam';
import { Season } from 'src/app/model/entities/season';
import { MatchdayPlayer } from 'src/app/model/entities/matchdayplayer';
import { UtilsPipe } from 'src/app/pipes/utils.pipe';
import { FutfemserviceService } from 'src/app/services/persistencia/futfem.service';
import { Router } from '@angular/router';
import { MatchdayTeam } from 'src/app/model/entities/matchdayteam';

@Component({
  selector: 'app-matchday',
  templateUrl: './matchday.component.html',
  styleUrls: ['./matchday.component.css']
})
export class MatchdayComponent  {
  estrategial = '';
  estrategiav = '';
  seasons: Season[] = [];
  seasonLocal: String = '2122';
  seasonVisitor: String = '2122';
  teams: Team[] = [] ;
  local : Team = new Team();
  visitante : Team = new Team();
  matchdayLocalTeam : MatchdayTeam = new MatchdayTeam();
  matchdayVisitanteTeam : MatchdayTeam = new MatchdayTeam();
  squadlocal : PlayerTeam[] = [];
  squadvisitante : PlayerTeam[] = [];
  jugadorl : MatchdayPlayer[] = [] ;
  jugadorv : MatchdayPlayer[] = [];
  estrategia :  String[] = ['4-4-2','4-3-3' , '3-5-2','3-4-3'] ;
  plantillaLocal : MatchdayPlayer[] = [];
  plantillaVisitante : MatchdayPlayer[] = [];
  posicionesLocal : string[] = [];
  posicionesVisitante : string[] = [];
  datosPosiciones: any[] = [];
  mostrarlocal = false;
  mostrarvisitante = false;
  colorLocal = this.futfemService.colorLocal;
  colorVisitor = this.futfemService.colorVisitor;
  colorBack = this.futfemService.colorBack;
  validateLocal = false;
  validateVisitante = false;
  mensajeErrorLocal = 'Faltan jugadores en la alineación local';
  mensajeErrorVisitante = 'Faltan jugadores en la alineación visitante';

  constructor(private router:Router,private utilPipe: UtilsPipe, private apiServices:ApifutfemService, private futfemService:FutfemserviceService) { 
    console.log ("SE CREA MATCHDAY");
  }

  cargarPlantillaLocal(idTeam:number, season:String){
    this.squadlocal = [];
    this.plantillaLocal = [];
    this.futfemService.equipoMatchdayLocal = [];
    this.apiServices.getTeam(idTeam).subscribe( (datosEquipo :any) => {
      this.local = datosEquipo;
    });
    this.apiServices.getSquads(idTeam, season )
    .subscribe( (datosSquads : any) => {
      this.plantillaLocal = this.plantillaLocal.concat(datosSquads);
      this.jugadorl = this.plantillaLocal;
      this.plantillaLocal.forEach(element => {
        this.apiServices.getPlayer(element.idPlayer )
        .subscribe( (datosJugador : any) => {
          this.cargarMatchdayPlayer(element,datosJugador);
          var posicion = element.position;
          var results = this.futfemService.equipoMatchdayLocal.filter(function (posiciones) { return posiciones.positionmatch == posicion; });
          var results2 = this.posicionesLocal.filter(function (posiciones) { return posiciones == posicion; });
          if (results.length < 1 && results2.length > 0){
            element.positionmatch = posicion;
            console.log('local:'+element.nickname+':'+element.positionmatch);
          }else{
            element.positionmatch = 'NC';
          }
          this.futfemService.equipoMatchdayLocal.push(element); // para incluirlo en el equipo
        });
      });
    });    
    this.mostrarlocal = true;
  }

  cargarPlantillaVisitante(idTeam:number, season:String){
    this.squadvisitante = [];
    this.plantillaVisitante = [];
    this.futfemService.equipoMatchdayVisitante = [];
    this.apiServices.getTeam(idTeam).subscribe( (datosEquipo :any) => {
      this.visitante = datosEquipo;
    });
    this.apiServices.getSquads(idTeam, season )
    .subscribe( (datosSquads : any) => {
      this.plantillaVisitante = this.plantillaVisitante.concat(datosSquads);
      this.jugadorv = this.plantillaVisitante;
      this.plantillaVisitante.forEach(element => {
        this.apiServices.getPlayer(element.idPlayer )
        .subscribe( (datosJugador : any) => {
          this.cargarMatchdayPlayer(element,datosJugador);
          var posicion = element.position;
          var results = this.futfemService.equipoMatchdayVisitante.filter(function (posiciones) { return posiciones.positionmatch == posicion; });
          var results2 = this.posicionesVisitante.filter(function (posiciones) { return posiciones == posicion; });
          if (results.length < 1 && results2.length > 0){
            element.positionmatch = posicion;
            console.log('local:'+element.nickname+':'+element.positionmatch);
          }else{
            element.positionmatch = 'NC';
          }
          this.futfemService.equipoMatchdayVisitante.push(element); // para incluirlo en el equipo
        });
      });
    });    
    this.mostrarvisitante = true;
  }

  cargarMatchdaySquad(mp:MatchdayPlayer, squad:PlayerTeam) {
    mp.id = squad.id;
    mp.idPlayer = squad.idPlayer;
    mp.idTeam= squad.idTeam;
    mp.season = squad.season;
    mp.dorsal = squad.dorsal;
  }

  cargarMatchdayPlayer(mp:MatchdayPlayer, jugador:any) {

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

  cargarMatchdayTeam(mt:MatchdayTeam, equipo:Team){
    mt.id = equipo.id;
    mt.established = equipo.established;
    mt.name = equipo.name;
    mt.nickname = equipo.nickname;
    mt.country = equipo.country;
    mt.urlpic = equipo.urlpic;
    mt.urlshirt = equipo.urlshirt;
    mt.agresividad=50;
    mt.moral=50;
    mt.ataque=50;
    mt.posesion=50;
    mt.defensa=50;
  }

  cargarPosicionesEstrategia(){
    this.posicionesLocal = [];
    this.posicionesVisitante= [];
    this.apiServices.getPositions( )
    .subscribe( (datosPosiciones : any) => {
      switch (this.estrategial){
        case '4-4-2':
          this.posicionesLocal.push('GK', 'RD', 'RDC','LDC','LD','RMC','LMC','MCO','MC','FW','FFW','RE1','RE2','RE3','RE4','RE5','RE6','RE7');
          break;
        case '4-3-3':
          this.posicionesLocal.push('GK','RD', 'RCD','LCD','LD', 'MCD','LMC','RMC','LW','RW','FW','RE1','RE2','RE3','RE4','RE5','RE6','RE7');
          break;
        case '3-5-2':
          this.posicionesLocal.push('GK', 'RCD','CDF','LCD','RM', 'RMC','MCD','LMC','LM','FW','FFW','RE1','RE2','RE3','RE4','RE5','RE6','RE7');
          break;
        case '3-4-3':
          this.posicionesLocal.push('GK','RCD', 'CDF','LCD','MCD', 'RMC','LMC','MCO','LW','RW','FW','RE1','RE2','RE3','RE4','RE5','RE6','RE7');
          break;
          default:
          this.posicionesLocal.push('GK','RD', 'RCD','LCD','LD', 'MCD','LMC','RMC','LW','RW','FW','RE1','RE2','RE3','RE4','RE5','RE6','RE7');
          break;
      }
      switch (this.estrategiav){
        case '4-4-2':
          this.posicionesVisitante.push('GK', 'RD', 'RDC','LDC','LD','RMC','LMC','MCO','MC','FW','FFW','RE1','RE2','RE3','RE4','RE5','RE6','RE7');
          break;
        case '4-3-3':
          this.posicionesVisitante.push('GK','RD', 'RCD','LCD','LD', 'MCD','LMC','RMC','LW','RW','FW','RE1','RE2','RE3','RE4','RE5','RE6','RE7');
          break;
        case '3-5-2':
          this.posicionesVisitante.push('GK', 'RCD','CDF','LCD','RM', 'RMC','MCD','LMC','LM','FW','FFW','RE1','RE2','RE3','RE4','RE5','RE6','RE7');
          break;
        case '3-4-3':
          this.posicionesVisitante.push('GK','RCD', 'CDF','LCD','MCD', 'RMC','LMC','MCO','LW','RW','FW','RE1','RE2','RE3','RE4','RE5','RE6','RE7');
          break;
          default:
          this.posicionesVisitante.push('GK','RD', 'RCD','LCD','LD', 'MCD','LMC','RMC','LW','RW','FW','RE1','RE2','RE3','RE4','RE5','RE6','RE7');
          break;
      }
    });
  }

  actualizaPosiciones(event:any, position:string, local:boolean){
    let id:number = event.currentTarget.value;
    if (local == true){
      //this.cargarPlantillaLocal(player.idTeam,player.season);
      this.plantillaLocal.map(function(jugador){
        if(jugador.positionmatch == position){
          jugador.positionmatch = "NC";
        }
      });
      this.plantillaLocal.map(function(jugador){
        if(jugador.idPlayer == id){
          jugador.positionmatch = position;
        }
      });

      this.futfemService.equipoMatchdayLocal.map(function(jugador){
        if(jugador.positionmatch == position){
          jugador.positionmatch = "NC";
        }
      });
      this.futfemService.equipoMatchdayLocal.map(function(jugador){
        if(jugador.idPlayer == id){
          jugador.positionmatch = position;
        }
      });
    } else{

      this.plantillaVisitante.map(function(jugador){
        if(jugador.positionmatch == position){
          jugador.positionmatch = "NC";
        }
      });
      this.plantillaVisitante.map(function(jugador){
        if(jugador.idPlayer == id){
          jugador.positionmatch = position;
        }
      });

      this.futfemService.equipoMatchdayVisitante.map(function(jugador){
        if(jugador.positionmatch == position){
          jugador.positionmatch = "NC";
        }
      });
      this.futfemService.equipoMatchdayVisitante.map(function(jugador){
        if(jugador.idPlayer == id){
          jugador.positionmatch = position;
        }
      });
    }
  }

  toplay(){
    let posicionesCompletasLocal = 0;
    this.posicionesLocal.forEach(posicion => {
      this.plantillaLocal.map(function(jugador){
        if(jugador.positionmatch == posicion){
          console.log(posicion+':'+jugador.nickname);
          posicionesCompletasLocal++;
        }
      });
    });
    if (posicionesCompletasLocal == 18) {
      this.validateLocal = true;
    }else{
      this.validateLocal = false;
      //this.showSuccess(false,'Error:'+this.mensajeErrorLocal);

    }
    let posicionesCompletasVisitante = 0;
    this.posicionesVisitante.forEach(posicion => {
      this.plantillaVisitante.map(function(jugador){
        if(jugador.positionmatch == posicion){
          console.log(posicion+':'+jugador.nickname);
          posicionesCompletasVisitante ++;
        }
      });
    });
    if (posicionesCompletasVisitante == 18) {
      this.validateVisitante = true;
    }else{
      this.validateVisitante = false;
      //this.showSuccess(false,'Error:'+this.mensajeErrorVisitante);
    }
    if (this.validateLocal && this.validateVisitante) {
      this.futfemService.equipoLocal = this.matchdayLocalTeam;
      console.log ('nombre:'+this.local.name);
      this.futfemService.equipoVisitante = this.matchdayVisitanteTeam;
      this.futfemService.estrategiaLocal = this.estrategial;
      this.futfemService.estrategiaVisitante = this.estrategiav;
      this.futfemService.equipoMatchdayLocal = [];
      this.futfemService.equipoMatchdayVisitante = [];
      this.posicionesLocal.forEach(posicion => {
        this.futfemService.equipoMatchdayLocal.push(this.plantillaLocal.filter(i => i.positionmatch === posicion)[0]);
      });
      this.posicionesVisitante.forEach(posicion => {
        this.futfemService.equipoMatchdayVisitante.push(this.plantillaVisitante.filter(i => i.positionmatch === posicion)[0]);
      });
     
      this.futfemService.equipoMatchdayLocal.forEach(player => {
        this.apiServices.addMatchdayPlayerLocal(player).subscribe(
          response => {console.log ('grabado jugador local :'+player.name); });
      });
      this.futfemService.equipoMatchdayVisitante.forEach(player => {
        this.apiServices.addMatchdayPlayerVisitante(player).subscribe(
          response => {console.log ('grabado jugador visitante :'+player.name); });
      });
      this.cargarMatchdayTeam(this.matchdayLocalTeam, this.local);
      this.apiServices.addMatchdayTeamLocal(this.matchdayLocalTeam).subscribe(
        response => { console.log ('grabado equipo local :'+this.matchdayLocalTeam.name); });
      this.router.navigate(['/manager']);
      this.cargarMatchdayTeam(this.matchdayVisitanteTeam, this.visitante);
      this.apiServices.addMatchdayTeamVisitante(this.matchdayVisitanteTeam).subscribe(
        response => { console.log ('grabado equipo equipo :'+this.matchdayVisitanteTeam.name); });
      this.router.navigate(['/manager']);
    }

  }
}


