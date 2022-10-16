import { DatePipe } from '@angular/common';
export class MatchdayTeam {
    id:number=0;
    name:string=''; 
    country:string='';
    established:Date= new Date();
    nickname:string='';
    urlpic:string='';
    urlshirt:string=''
    moral:number=0;
    agresividad:number=0;;
    ataque:number=0;
    posesion:number=0;
    defensa:number=0;
    goles:number=0;
}
