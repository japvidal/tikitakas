import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Team } from '../../model/entities/team';
import { Player } from '../../model/entities/player';
import { Competition } from 'src/app/model/entities/competition';
import { PlayerTeam } from '../../model/entities/playerteam';
import { MatchdayPlayer } from '../../model/entities/matchdayplayer';
import { MatchdayTeam } from 'src/app/model/entities/matchdayteam';
import { Referee } from 'src/app/model/entities/referee';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({providedIn:'root'})

export class ApifutfemService {

  baseURLCountries = 'https://restcountries.com/v3.1/all';
     
  baseURLTeams = 'http://localhost:8090/api/futfem/teams/';

  baseURLPlayers = 'http://localhost:8090/api/futfem/players/';

  baseURLPositions = 'http://localhost:8090/api/futfem/positions/';

  baseURLReferees = 'http://localhost:8090/api/futfem/referees/';

  baseURLCompetitions = 'http://localhost:8090/api/futfem/competitions/';

  baseURLSquads = 'http://localhost:8090/api/futfem/squads/';

  baseURLMatchdayPlayersLocal = 'http://localhost:8090/api/futfem/matchdayplayerslocal/';

  baseURLMatchdayPlayersVisitante = 'http://localhost:8090/api/futfem/matchdayplayersvisitante/';

  baseURLMatchdayTeamLocal = 'http://localhost:8090/api/futfem/matchdayteamlocal/';

  baseURLMatchdayTeamVisitante = 'http://localhost:8090/api/futfem/matchdayteamvisitante/';

  baseURLMatch = 'http://localhost:8090/api/futfem/match/';

  baseURLTeamsTemp = 'http://localhost:8090/api/futfem/teamstemp/';

  baseURLPlayersTemp = 'http://localhost:8090/api/futfem/playerstemp/';

  baseURLRefereesTemp = 'http://localhost:8090/api/futfem/refereestemp/';

  baseURLCompetitionsTemp = 'http://localhost:8090/api/futfem/competitionstemp/';

  baseURLSquadsTemp = 'http://localhost:8090/api/futfem/squadstemp/';


  constructor(private http: HttpClient) {
       
  }

  public getQuery ( query: string){
    const url= `https://restcountries.eu/rest/v2/${query}`;

    return this.http.get(url, httpOptions);
  }


  getCountries(){
    console.log('enviando paises');
    return this.http.get(this.baseURLCountries,httpOptions);
  }

 
  getPositions(){
    console.log('enviando posiciones');
    return this.http.get(this.baseURLPositions,httpOptions);

  }

  getReferees(){
    console.log('enviando arbitros');
    return this.http.get(this.baseURLReferees,httpOptions);
  }

  getRefereesTemp(){
    console.log('enviando arbitros');
    return this.http.get(this.baseURLRefereesTemp,httpOptions);
  }

  addReferee(arbitro:Referee): Observable<any> {
    const headers = { 'content-type': 'application/json'}
    const body=JSON.stringify(arbitro);
    console.log(body);
    return this.http.post(this.baseURLReferees,body,{'headers':headers});
  }

  addRefereeTemp(arbitro:Referee): Observable<any> {
    const headers = { 'content-type': 'application/json'}
    const body=JSON.stringify(arbitro);
    console.log(body);
    return this.http.post(this.baseURLRefereesTemp,body,{'headers':headers});
  }

  editReferee(arbitro:Referee): Observable<any> {
    const headers = { 'content-type': 'application/json'}
    const body=JSON.stringify(arbitro);
    console.log(body);
    return this.http.put(this.baseURLReferees+arbitro.id,body,{'headers':headers});
  }

  editRefereeTemp(arbitro:Referee): Observable<any> {
    const headers = { 'content-type': 'application/json'}
    const body=JSON.stringify(arbitro);
    console.log(body);
    return this.http.put(this.baseURLRefereesTemp+arbitro.id,body,{'headers':headers});
  }

  getTeams(){
    console.log('enviando equipos');
    return this.http.get(this.baseURLTeams,httpOptions);
  }

  getTeamsTemp(){
    console.log('enviando equipos');
    return this.http.get(this.baseURLTeamsTemp,httpOptions);
  }

  getTeam(idTeam:number){
    console.log('enviando equipo:'+idTeam);
    return this.http.get(this.baseURLTeams+idTeam,httpOptions);
  }

  getTeamTemp(idTeam:number){
    console.log('enviando equipo:'+idTeam);
    return this.http.get(this.baseURLTeamsTemp+idTeam,httpOptions);
  }

  addTeam(equipo:Team): Observable<any> {
    const headers = { 'content-type': 'application/json'}
    const body=JSON.stringify(equipo);
    console.log(body);
    return this.http.post(this.baseURLTeams,body,{'headers':headers});
  }

  addTeamTemp(equipo:Team): Observable<any> {
    const headers = { 'content-type': 'application/json'}
    const body=JSON.stringify(equipo);
    console.log(body);
    return this.http.post(this.baseURLTeamsTemp,body,{'headers':headers});
  }

  editTeam(equipo:Team): Observable<any> {
    const headers = { 'content-type': 'application/json'}
    const body=JSON.stringify(equipo);
    console.log(body);
    return this.http.put(this.baseURLTeams+equipo.id,body,{'headers':headers});
  }

  editTeamTemp(equipo:Team): Observable<any> {
    const headers = { 'content-type': 'application/json'}
    const body=JSON.stringify(equipo);
    console.log(body);
    return this.http.put(this.baseURLTeamsTemp+equipo.id,body,{'headers':headers});
  }

  getPlayers(){
    console.log('enviando jugadores');
    return this.http.get(this.baseURLPlayers,httpOptions);
  }

  getPlayersTemp(){
    console.log('enviando jugadores');
    return this.http.get(this.baseURLPlayersTemp,httpOptions);
  }

  getPlayer(idplayer:number){
    console.log('enviando jugador:'+idplayer);
    return this.http.get(this.baseURLPlayers+idplayer,httpOptions);
  }

  getPlayerTemp(idplayer:number){
    console.log('enviando jugador:'+idplayer);
    return this.http.get(this.baseURLPlayersTemp+idplayer,httpOptions);
  }

  addPlayer(jugador:Player): Observable<any> {
    const headers = { 'content-type': 'application/json'}
    const body=JSON.stringify(jugador);
    console.log(body);
    return this.http.post(this.baseURLPlayers,body,{'headers':headers});
  }

  addPlayerTemp(jugador:Player): Observable<any> {
    const headers = { 'content-type': 'application/json'}
    const body=JSON.stringify(jugador);
    console.log(body);
    return this.http.post(this.baseURLPlayersTemp,body,{'headers':headers});
  }

  editPlayer(jugador:Player): Observable<any> {
    const headers = { 'content-type': 'application/json'}
    const body=JSON.stringify(jugador);
    console.log(body);
    return this.http.put(this.baseURLPlayers+jugador.id,body,{'headers':headers});
  }

  editPlayerTemp(jugador:Player): Observable<any> {
    const headers = { 'content-type': 'application/json'}
    const body=JSON.stringify(jugador);
    console.log(body);
    return this.http.put(this.baseURLPlayersTemp+jugador.id,body,{'headers':headers});
  }

  getCompetitions(){
    console.log('enviando competiciones');
    return this.http.get(this.baseURLCompetitions,httpOptions);
  }

  getCompetitionsTemp(){
    console.log('enviando competiciones');
    return this.http.get(this.baseURLCompetitionsTemp,httpOptions);
  }

  addCompetition(competicion:Competition): Observable<any> {
    const headers = { 'content-type': 'application/json'}
    const body=JSON.stringify(competicion);
    console.log(body);
    return this.http.post(this.baseURLCompetitions,body,{'headers':headers});
  }

  addCompetitionTemp(competicion:Competition): Observable<any> {
    const headers = { 'content-type': 'application/json'}
    const body=JSON.stringify(competicion);
    console.log(body);
    return this.http.post(this.baseURLCompetitionsTemp,body,{'headers':headers});
  }

  editCompetition(competicion:Competition): Observable<any> {
    const headers = { 'content-type': 'application/json'}
    const body=JSON.stringify(competicion);
    console.log(body);
    return this.http.put(this.baseURLCompetitions+competicion.id,body,{'headers':headers});
  }

  editCompetitionTemp(competicion:Competition): Observable<any> {
    const headers = { 'content-type': 'application/json'}
    const body=JSON.stringify(competicion);
    console.log(body);
    return this.http.put(this.baseURLCompetitionsTemp+competicion.id,body,{'headers':headers});
  }

  getSquads(idTeam:number, season:String){
    console.log('enviando plantilla de temporada:'+season);
    return this.http.get(this.baseURLSquads+idTeam+'/'+season+'/listByIdTeam',httpOptions);
  }

  getSquadsTemp(idTeam:number, season:String){
    console.log('enviando plantilla de temporada:'+season);
    return this.http.get(this.baseURLSquadsTemp+idTeam+'/'+season+'/listByIdTeam',httpOptions);
  }

  getSquadsAll( ){
    console.log('enviando todas las plantillas');
    return this.http.get(this.baseURLSquads,httpOptions);   
  }

  getSquadsAllTemp( ){
    console.log('enviando todas las plantillas');
    return this.http.get(this.baseURLSquadsTemp,httpOptions);   
  }

  getSquadsAllSeason(season:String){
    console.log('enviando todas las plantillas de una temporada');
    return this.http.get(this.baseURLSquads+season+'/listBySeason',httpOptions);   
  }

  getSquadsAllSeasonTemp(season:String){
    console.log('enviando todas las plantillas de una temporada');
    return this.http.get(this.baseURLSquadsTemp+season+'/listBySeason',httpOptions);   
  }
  
  addSquad(squad:PlayerTeam): Observable<any> {
    const headers = { 'content-type': 'application/json'}
    const body=JSON.stringify(squad);
    console.log(body);
    return this.http.post(this.baseURLSquads,body,{'headers':headers});
  }

  addSquadTemp(squad:PlayerTeam): Observable<any> {
    const headers = { 'content-type': 'application/json'}
    const body=JSON.stringify(squad);
    console.log(body);
    return this.http.post(this.baseURLSquadsTemp,body,{'headers':headers});
  }

  editSquad(squad:PlayerTeam): Observable<any> {
    const headers = { 'content-type': 'application/json'}
    const body=JSON.stringify(squad);
    console.log(body);
    return this.http.put(this.baseURLSquads+squad.id,body,{'headers':headers});
  }

  editSquadTemp(squad:PlayerTeam): Observable<any> {
    const headers = { 'content-type': 'application/json'}
    const body=JSON.stringify(squad);
    console.log(body);
    return this.http.put(this.baseURLSquadsTemp+squad.id,body,{'headers':headers});
  }

   removeSquad(id:string): Observable<any> {
    const headers = { 'content-type': 'application/json'}
    return this.http.delete(this.baseURLSquads+id,{'headers':headers});
  }

  removeSquadTemp(id:string): Observable<any> {
    const headers = { 'content-type': 'application/json'}
    return this.http.delete(this.baseURLSquadsTemp+id,{'headers':headers});
  }

  addMatchdayTeamLocal(equipo:MatchdayTeam): Observable<any> {
    const headers = { 'content-type': 'application/json'}
    const body=JSON.stringify(equipo);
    console.log(body);
    return this.http.post(this.baseURLMatchdayTeamLocal,body,{'headers':headers});
  }

  addMatchdayTeamVisitante(equipo:MatchdayTeam): Observable<any> {
    const headers = { 'content-type': 'application/json'}
    const body=JSON.stringify(equipo);
    console.log(body);
    return this.http.post(this.baseURLMatchdayTeamVisitante,body,{'headers':headers});
  }

  getMatchdayTeamLocal(){
    console.log('recuperando equipo local');
    return this.http.get(this.baseURLMatchdayTeamLocal,httpOptions);
  }

  getMatchdayTeamVisitante(){
    console.log('recuperando equipo visitante');
    return this.http.get(this.baseURLMatchdayTeamVisitante,httpOptions);
  }

  eliminarMatchdayTeamLocal(){
    const headers = { 'content-type': 'application/json'}
    return this.http.delete(this.baseURLMatchdayTeamLocal,{'headers':headers});
  }
  eliminarMatchdayTeamVisitante(){
    const headers = { 'content-type': 'application/json'}
    return this.http.delete(this.baseURLMatchdayTeamVisitante,{'headers':headers});
  }
  
  addMatchdayPlayerLocal(jugador:MatchdayPlayer): Observable<any> {
    const headers = { 'content-type': 'application/json'}
    const body=JSON.stringify(jugador);
    console.log(body);
    return this.http.post(this.baseURLMatchdayPlayersLocal,body,{'headers':headers});
  }

  addMatchdayPlayerVisitante(jugador:MatchdayPlayer): Observable<any> {
    const headers = { 'content-type': 'application/json'}
    const body=JSON.stringify(jugador);
    console.log(body);
    return this.http.post(this.baseURLMatchdayPlayersVisitante,body,{'headers':headers});
  }

  getMatchdayPlayersLocalByPosition(positionmatch:String){
    console.log('enviando posicion  de jugador local :'+this.baseURLMatchdayPlayersLocal+positionmatch+'/listByPositionmatch');
    return this.http.get(this.baseURLMatchdayPlayersLocal+positionmatch+'/listByPositionmatch',httpOptions);   
  }

  getMatchdayPlayersVisitanteByPosition(positionmatch:String){
    console.log('enviando posicion  de jugador visitante :'+this.baseURLMatchdayPlayersVisitante+positionmatch+'/listByPositionmatch');
    return this.http.get(this.baseURLMatchdayPlayersVisitante+positionmatch+'/listByPositionmatch',httpOptions);   
  }

  eliminarDatosMatchdayPlayersLocal(){
    const headers = { 'content-type': 'application/json'}
    return this.http.delete(this.baseURLMatchdayPlayersLocal,{'headers':headers});
  }
  eliminarDatosMatchdayPlayersVisitante(){
    const headers = { 'content-type': 'application/json'}
    return this.http.delete(this.baseURLMatchdayPlayersVisitante,{'headers':headers});
  }

  editMatchdayPlayerLocal(jugador:MatchdayPlayer): Observable<any> {
    const headers = { 'content-type': 'application/json'}
    const body=JSON.stringify(jugador);
    console.log(body);
    return this.http.put(this.baseURLMatchdayPlayersLocal+jugador.id,body,{'headers':headers});
  }

  editMatchdayPlayerVisitante(jugador:MatchdayPlayer): Observable<any> {
    const headers = { 'content-type': 'application/json'}
    const body=JSON.stringify(jugador);
    console.log(body);
    return this.http.put(this.baseURLMatchdayPlayersVisitante+jugador.id,body,{'headers':headers});
  }

  jugar(minuto:number){
    return this.http.get(this.baseURLMatch+minuto,httpOptions);   
  }
}