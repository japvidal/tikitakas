import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FutfemserviceService } from '../../services/persistencia/futfem.service';
import { ApifutfemService } from '../../services/apiservice/apifutfem.service';
import { Team } from '../../model/entities/team';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-clubsadm',
  templateUrl: './clubsadm.component.html',
  styleUrls: ['./clubsadm.component.css'],
  providers: [DatePipe]
})
export class ClubsadmComponent implements OnInit {
  forma : FormGroup;

  buscar: string = '';  
  totalEquipos = 0;
  datosTeams: any[] = []; 
  datosTeamsAux : any[] = [];
  team: Team = new Team();
  datosCountries: any[] = [];
  noimagen = 'escudo/noimage';

  constructor(private datePipe: DatePipe, private futfemservice:FutfemserviceService, private apiServices:ApifutfemService, private fb:FormBuilder, private translate:TranslateService) {
    this.forma = this.fb.group({
      nombre  : ['', [ Validators.required, Validators.minLength(2) ]  ],
      sobrenombre: ['', [ Validators.required, Validators.minLength(2) ]  ],
      pais: ['', [ Validators.required, Validators.minLength(2) ]  ],
      fundacion: [ '', [ Validators.required ]  ],
      escudo: ['noimage' ],
      camiseta: ['noimage' ]
    });
  }

  ngOnInit(): void {
    this.reset();
    
  }

  limpiar(){
    this.team.established = new Date();
    this.team.name = '';
    this.team.id = 0;
    this.team.nickname = '';
    this.team.urlpic = '';
    this.team.urlshirt = '';
    this.team.country = '';
  }

  guardar(){
    console.log('ENTRANDO A GUARDAR:'+ this.forma.invalid);
    if ( this.forma.invalid ) {
      Swal.fire( this.translate.instant('ERROR'), this.translate.instant('FORM.ERROR.MESSAGE'), 'error' );
      return Object.values( this.forma.controls ).forEach( control => {          
        if ( control instanceof FormGroup ) {
          Object.values( control.controls ).forEach( control => control.markAsTouched() );
        } else {
          control.markAsTouched();
        }
      });
    }
    this.team.name = this.forma.get('nombre')?.value.toUpperCase();
    this.team.nickname = this.forma.get("sobrenombre")?.value.toUpperCase();
    this.team.country = this.forma.get("pais")?.value;
    this.team.established = this.forma.get("fundacion")?.value;
    this.team.urlpic = this.forma.get("escudo")?.value;
    this.team.urlshirt = this.forma.get("camiseta")?.value;

      if (this.team.id === 0){
        this.apiServices.addTeam(this.team).subscribe(
          response => {
            this.reset();
            this.forma.reset();
            Swal.fire( this.translate.instant('FORM.OK.DONE'), this.translate.instant('FORM.OK.MESSAGE'), 'success' );
          });
      } else{
        this.apiServices.editTeam(this.team).subscribe(
          response => {
            this.reset();
            this.forma.reset();
            Swal.fire( this.translate.instant('FORM.OK.DONE'), this.translate.instant('FORM.OK.MESSAGEEDIT'), 'success' );    
          });
        }
   

  }

  buscador(){
    this.datosTeams = this.datosTeamsAux;
      let datosTeams2 : any[] = [];
      if (this.buscar.length > 2){
        for (let equipo of this.datosTeams){
          console.log(equipo.id + ','+equipo.name);
          if (equipo.name.indexOf(this.buscar.toUpperCase()) > -1  || equipo.nickname.indexOf(this.buscar.toUpperCase()) > -1 ){
            datosTeams2.push(equipo);
          }
        }
        if (datosTeams2.length > 0){
          this.datosTeams = datosTeams2;
        }
        if (datosTeams2.length == 1){
          this.team = datosTeams2[0];
        }
        this.totalEquipos = this.datosTeams.length;
        datosTeams2 = [];
      }
  }

  selecciona(equipo:Team){
    this.team = equipo;
  }

  reset(){
    this.forma.reset();
    this.limpiar();
    this.cargarPaises();
    this.cargaEquipos();
  }

  cargaEquipos(){
    this.apiServices.getTeams( )
    .subscribe( (datosTeams : any) => {
      for (let t1 of datosTeams){
        t1.established = this.datePipe.transform(t1.established, 'yyyy-MM-dd');
      }

      this.datosTeams = datosTeams;
      this.datosTeamsAux = this.datosTeams;
      this.totalEquipos = this.datosTeams.length;
    });
  }

  cargarPaises(){
    this.datosCountries = this.futfemservice.datosCountries;
  }
}
