export class MatchdayPlayer {
    id:number = 0;
    idTeam:number = 0;
    idPlayer:number = 0;
    season = '';
    dorsal:string='';

    name:string=''; 
    surname:string='';
    birthdate:string='';
    nickname:string='                  ';
    position:string='';
    country:string='';
    urlpic:string='';
    idsquad:number = 0;

    velocidad:number = 60;
    resistencia:number=60;
    defaerea:number=60;
    defestrategia:number=60;
    defagresividad:number=60;
    defanticipacion:number=60;
    ataqueaereo:number=60;
    ataqueregate:number=60;
    ataquepases:number=60;
    ataqueremate:number=60;
    ataquefaltas:number=60;
    ataquepenaltys:number=60;
    portero:number=60;
    visionjuego:number=60;
    totalmedia:number=60;
    
    positionmatch:string='';

    amarilla:number=0;
    roja:number=0;
    faltas:number=0;
    goles:number[]=[];
    paradas:number[]=[];

    constructor(id: number) {
        this.id = 0;
        this.idPlayer = 0;
        this.idTeam = 0;
        this.nickname = '              ';
    }

}
