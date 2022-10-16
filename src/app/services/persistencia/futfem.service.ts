import { Injectable } from '@angular/core';
import { Player } from 'src/app/model/entities/player';
import { Referee } from 'src/app/model/entities/referee';
import { Team } from 'src/app/model/entities/team';
import { MatchdayPlayer } from '../../model/entities/matchdayplayer';
import { MatchdayTeam } from '../../model/entities/matchdayteam';
import { ApifutfemService } from '../apiservice/apifutfem.service';

@Injectable({providedIn:'root'})
export class FutfemserviceService {

  public datosTeam:Team;
  public datosPlayer:Player;
  public equipoMatchdayLocal: MatchdayPlayer[];
  public equipoMatchdayVisitante: MatchdayPlayer[];
  public plantillaLocal: MatchdayPlayer[];
  public plantillaVisitante: MatchdayPlayer[];
  public referee: Referee;
  public estrategiaLocal : String = '4-3-3';
  public estrategiaVisitante: String = '4-3-3';
  public equipoLocal: MatchdayTeam;
  public equipoVisitante : MatchdayTeam;
  public arbitro = '';
  public colorVisitor = 'red';
  public colorLocal = 'black';
  public colorTitle = 'purple';
  public colorBack = 'white';
  public colorMain = 'white';
  public colorField = 'black';
  public localId:number = 0;
  public visitanteId:number = 0;
  public localSeason = '';
  public visitanteSeason = '';

  public datosPosiciones : [];
  public datosCountries : [];

  constructor(private apiServices:ApifutfemService) {
    this.datosPlayer = new Player();
    this.datosTeam = new Team();
    this.equipoMatchdayLocal=[];
    this.equipoMatchdayVisitante=[];
    this.plantillaLocal=[];
    this.plantillaVisitante=[];
    this.equipoLocal = new MatchdayTeam();
    this.equipoVisitante = new MatchdayTeam();
    this.referee = new Referee();
    this.visitanteId = 0;
    this.localId= 0;
    this.visitanteSeason='';
    this.localSeason='';

    this.datosPosiciones = [];
    this.datosCountries = [];
   }

   cargarPosiciones(){
    this.apiServices.getPositions( )
    .subscribe( (datosPosiciones : any) => {
      
      this.datosPosiciones = datosPosiciones;
      console.log(this.datosPosiciones);
    });
  }

  cargarPaises(){
    this.apiServices.getCountries( )
    .subscribe( (datosCountries : any) => {
      this.datosCountries = datosCountries;
      console.log(this.datosCountries);
    });
  }

    // funcion para ordenar por dorsal de menor a mayor
    ordenarDorsal(items:MatchdayPlayer[]){
      items.sort(function(a,b){
        if ( Number(a.dorsal) < Number(b.dorsal) ){
          return -1;
        }
        if ( Number(a.dorsal) > Number(b.dorsal) ){
          return 1;
        }
        return 0;
      });
    }
  
    // funcion para ordenar por dorsal de menor a mayor
    ordenarEstrategia(items:MatchdayPlayer[], posiciones:string[]){
      items.sort(function(a,b){
        
        if ( posiciones.lastIndexOf(a.positionmatch) < posiciones.lastIndexOf(b.positionmatch) ){
          return -1;
        }
        if ( posiciones.lastIndexOf(a.positionmatch) > posiciones.lastIndexOf(b.positionmatch) ){
          return 1;
        }
        return 0;
      });
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
  
    cargarPosicionesEstrategia( estrategia:String ) : string[]{
      let posiciones:string[] = [];
      switch (estrategia){
        case '4-4-2':
          posiciones.push('GK', 'RD', 'RCD','LCD','LD','RMC','LMC','MCO','MC','FW','FFW','RE1','RE2','RE3','RE4','RE5','RE6','RE7');
          break;
        case '4-3-3':
          posiciones.push('GK','RD', 'RCD','LCD','LD', 'MCD','LMC','RMC','LW','RW','FW','RE1','RE2','RE3','RE4','RE5','RE6','RE7');
          break;
        case '3-5-2':
          posiciones.push('GK', 'RCD','CDF','LCD','RM', 'RMC','MCD','LMC','LM','FW','FFW','RE1','RE2','RE3','RE4','RE5','RE6','RE7');
          break;
        case '3-4-3':
          posiciones.push('GK','RCD', 'CDF','LCD','MCD', 'RMC','LMC','MCO','LW','RW','FW','RE1','RE2','RE3','RE4','RE5','RE6','RE7');
          break;
          default:
          posiciones.push('GK','RD', 'RCD','LCD','LD', 'MCD','LMC','RMC','LW','RW','FW','RE1','RE2','RE3','RE4','RE5','RE6','RE7');
          break;
      }
      console.log('cargarposicionesestrategia:'+posiciones);
      return posiciones;

  }

  cargarMatchdayPlayer(mp:MatchdayPlayer, jugador:any) : MatchdayPlayer {

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

    return mp;
   }

   cargarEquipos(teams:Team[]):Team[]{
    this.apiServices.getTeams( )
    .subscribe( (datosTeams : any) => {
      teams = teams.concat(datosTeams);
    });
    return teams;
  }
}
