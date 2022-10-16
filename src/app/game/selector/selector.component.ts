import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { ApifutfemService } from 'src/app/services/apiservice/apifutfem.service';
import { Team } from 'src/app/model/entities/team';
import { PlayerTeam } from 'src/app/model/entities/playerteam';
import { Season } from 'src/app/model/entities/season';
import { MatchdayPlayer } from 'src/app/model/entities/matchdayplayer';
import { UtilsPipe } from 'src/app/pipes/utils.pipe';
import { FutfemserviceService } from 'src/app/services/persistencia/futfem.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatchdayTeam } from 'src/app/model/entities/matchdayteam';
import { TranslateService } from '@ngx-translate/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {CdkDragDrop, moveItemInArray, transferArrayItem,copyArrayItem} from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ UtilsPipe]
})
export class SelectorComponent implements OnInit {

  @Input('local') local: boolean = true;
  forma : FormGroup;
  seasons: Season[] = [];
  season: String = '2122';
  teams: Team[] = [] ;
  equipo : Team = new Team();
  matchdayTeam : MatchdayTeam = new MatchdayTeam();
  squad : PlayerTeam[] = [];
  jugadorl : MatchdayPlayer[] = [] ;
  estrategia :  String[] = ['4-4-2','4-3-3' , '3-5-2','3-4-3'] ;
  estrategial : String = '4-3-3';
  plantilla : MatchdayPlayer[] = [];
  convocados : MatchdayPlayer[] = [];
  convocadosAuxLocal:MatchdayPlayer[] = [];
  convocadosAuxVisitante:MatchdayPlayer[] = [];
  posiciones : string[] = [];
  datosPosiciones: any[] = [];

  constructor(private router:Router,private route: ActivatedRoute,private utilPipe: UtilsPipe, private apiServices:ApifutfemService, private futfemService:FutfemserviceService,private translate:TranslateService, private fb:FormBuilder) { 
    this.forma = this.fb.group({
      temporada  : ['', [ Validators.required, Validators.minLength(4) ]  ],
      equipo: ['', [ Validators.required ]  ],
      estrategia: ['', [ Validators.required ]  ]
    });
  }

  ngOnInit(): void {
    this.convocados = [];
    this.seasons = [new Season("2223","2022/2023"),new Season("2122","2021/2022"),new Season("2021","2020/2021")];
    this.cargarEquipos();

    this.apiServices.getPositions( )
    .subscribe( (datosPosiciones : any) => {      
      this.datosPosiciones = datosPosiciones;
      if (this.local){
        this.plantilla = this.futfemService.plantillaLocal.slice();
      }else{
        this.plantilla = this.futfemService.plantillaVisitante.slice();
      } 
      this.posiciones = this.futfemService.cargarPosicionesEstrategia(this.estrategial);
      this.resetConvocados();
    });

    this.apiServices.eliminarDatosMatchdayPlayersLocal().subscribe(
      response => {});
    this.apiServices.eliminarDatosMatchdayPlayersVisitante().subscribe(
      response => {});
    this.apiServices.eliminarMatchdayTeamLocal().subscribe(
      response => {console.log("Borrado equipos locales obsoletos");});
    this.apiServices.eliminarMatchdayTeamVisitante().subscribe(
      response => {console.log("Borrado equipos visitantes obsoletos");});

  }

  cargarEquipos(){
    this.apiServices.getTeams( )
    .subscribe( (datosTeams : any) => {
      this.teams = this.teams.concat(datosTeams);
    });
  }

  cargarPlantilla(equipo:Team, season:String){
    let idTeam = equipo.id;
    this.equipo = equipo;
    this.squad = new Array<PlayerTeam>();
    this.plantilla = new Array<MatchdayPlayer>();
    
    if (this.local){

      this.futfemService.plantillaLocal = new Array<MatchdayPlayer>();
      this.futfemService.equipoMatchdayLocal = new Array<MatchdayPlayer>();
      this.futfemService.equipoLocal = new MatchdayTeam();
    } else{
      this.futfemService.plantillaVisitante = new Array<MatchdayPlayer>();
      this.futfemService.equipoMatchdayVisitante = new Array<MatchdayPlayer>();
      this.futfemService.equipoVisitante = new MatchdayTeam();
    }
    this.jugadorl = new Array<MatchdayPlayer>();
    this.apiServices.getSquads(idTeam, season )
    .subscribe( (datosSquads : any) => {
      this.plantilla = this.plantilla.concat(datosSquads);
      if (this.local){
        this.futfemService.plantillaLocal = this.plantilla.slice();
      }else{
        this.futfemService.plantillaVisitante = this.plantilla.slice();
      }
      this.plantilla.forEach(element => {
        this.apiServices.getPlayer(element.idPlayer )
        .subscribe( (datosJugador : any) => {
          element = this.futfemService.cargarMatchdayPlayer(element,datosJugador);
        });
      });
    });
    if (this.local){
       this.futfemService.cargarMatchdayTeam(this.futfemService.equipoLocal,this.equipo);
    }else{
      this.futfemService.cargarMatchdayTeam(this.futfemService.equipoVisitante,this.equipo);
    }    
    this.resetConvocados();
  }


   resetConvocados(){
    this.convocados = [];
 
    this.posiciones.forEach(element => {
      let mp = new MatchdayPlayer(0);
      mp.idPlayer = 0;
      mp.positionmatch = element;
      this.convocados.push(mp);
      if (this.local){
        this.convocadosAuxLocal.push(mp);
      }else{
        this.convocadosAuxVisitante.push(mp);
      }
    });
   }


  cargarPosicionesEstrategia(){
     this.posiciones = this.futfemService.cargarPosicionesEstrategia(this.estrategial);
     this.resetConvocados();

     if (this.local){
       this.plantilla = this.futfemService.plantillaLocal.slice();
     }else{
      this.plantilla = this.futfemService.plantillaVisitante.slice();
     }
  }

  drop(event: CdkDragDrop<MatchdayPlayer[]>) {

    // SI movemos un elemento dentro de la misma lista
    if (event.previousContainer === event.container) { 
      
      // SI estamos en la lista de convocados y hay jugadores podemos desplazarlos
      if ( (event.container.id === 'cdk-drop-list-1' || event.container.id === 'cdk-drop-list-3') 
       && event.container.data[event.currentIndex].idPlayer > 0
       && event.container.data[event.previousIndex].idPlayer > 0 ){

        // SI DESPLAZAMOS UN PORTERO A POSICION DE PORTERO, U OTRO JUGADOR NO PORTERO A POSICION NO PORTERO 
        if ((event.container.data[event.currentIndex].positionmatch === 'GK' && event.container.data[event.previousIndex].position === 'GK') || 
        (event.container.data[event.previousIndex].positionmatch.indexOf('RE') > 0 && event.container.data[event.currentIndex].position === 'GK') ||
        (event.container.data[event.currentIndex].positionmatch != 'GK' &&  event.container.data[event.previousIndex].position != 'GK' ) ){ 
          let posicionmath = event.container.data[event.currentIndex].positionmatch;
          event.container.data[event.currentIndex].positionmatch = event.container.data[event.previousIndex].positionmatch;
          event.container.data[event.previousIndex].positionmatch = posicionmath;
          moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else{
          return;
        }
      } else{  
        return;
      }
    } else {
      // SI DESPLAZAMOS UN ELEMENTO DE PLANTILLA A CONVOCADOS
      if ((event.container.id === 'cdk-drop-list-1' || event.container.id === 'cdk-drop-list-3')) { 
        // SI MOVEMOS UN JUGADOR A LA POSICION DE PORTERO HA DE SER PORTERO
        if (event.container.data[event.currentIndex].positionmatch === 'GK'){ 
          if (event.container.data[event.currentIndex].positionmatch != event.previousContainer.data[event.previousIndex].position) {
            console.log("No se puede poner de portero a un jugador de campo"+event.previousContainer.data[event.previousIndex].position);
            return;
          } 
        // SI MOVEMOS A UNA POSICION DE CAMPO NO RESERVA NO PUEDE SER UN PORTERO 
        }else if ((event.container.data[event.currentIndex].positionmatch.indexOf('RE') < 0) && 
          (event.previousContainer.data[event.previousIndex].position === 'GK') &&
          (event.container.data[event.currentIndex].positionmatch != event.previousContainer.data[event.previousIndex].position)) {
          console.log("No se puede poner a un portero como jugador de campo"+event.container.data[event.currentIndex].positionmatch);
          return;
        }
        event.previousContainer.data[event.previousIndex].positionmatch = event.container.data[event.currentIndex].positionmatch;
        if (event.container.data[event.currentIndex].idPlayer > 0){
          this.plantilla.push(this.convocados[event.currentIndex]);
        }
        this.convocados.splice(event.currentIndex, 1);
        transferArrayItem(event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex);

      } else { // movemos de convocados a plantilla
        // SI EL CONVOCADO NO EXISTE NO SE PUEDE MOVER EL ELEMENTO A PLANTILLA
        if (event.previousContainer.data[event.previousIndex].idPlayer < 1){
          console.log("No se puede mover a plantilla una posicion sin jugador");
          return;
        }
        event.container.data[event.currentIndex].positionmatch = 'NC';
        copyArrayItem(event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex);
          if (this.local){
            this.convocados[event.previousIndex] = this.convocadosAuxLocal[event.previousIndex];
          }else{
            this.convocados[event.previousIndex] = this.convocadosAuxVisitante[event.previousIndex];
          }
      }
    }
    // FINALMENTE ORDENAMOS PLANTILLA POR DORSAL Y CONVOCADOS POR POSICION DE ESTRATEGIA
    this.futfemService.ordenarDorsal(this.plantilla);
    this.futfemService.ordenarEstrategia(this.convocados,this.posiciones);
    if (this.local){
      this.futfemService.equipoMatchdayLocal = this.convocados.slice();
    }else{
      this.futfemService.equipoMatchdayVisitante = this.convocados.slice();
    }
    
  }
  
}