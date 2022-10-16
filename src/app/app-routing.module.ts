import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SimulatorComponent } from './pages/simulator/simulator.component';
import { HomeComponent } from './pages/home/home.component';
import { MantenimientoComponent } from './pages/mantenimiento/mantenimiento.component';
import { MantenimientoadmComponent } from './pages/mantenimientoadm/mantenimientoadm.component';

import { PlayersComponent } from './crud/players/players.component';
import { ClubsComponent } from './crud/clubs/clubs.component';
import { CompetitionsComponent } from './crud/competitions/competitions.component';
import { SquadsComponent } from './crud/squads/squads.component';
import { RefereesComponent } from './crud/referees/referees/referees.component';

import { PlayersadmComponent } from './crudadm/playersadm/playersadm.component';
import { ClubsadmComponent } from './crudadm/clubsadm/clubsadm.component';
import { CompetitionsadmComponent } from './crudadm/competitionsadm/competitionsadm.component';
import { SquadsadmComponent } from './crudadm/squadsadm/squadsadm.component';
import { RefereesadmComponent } from './crudadm/refereesadm/refereesadm.component';

import { MatchdayComponent } from './game/matchday/matchday.component';
import { ManagerComponent } from './game/manager/manager.component';
import { SelectorComponent } from './game/selector/selector.component';
import { SelectorVisitanteComponent } from './game/selector-visitante/selector-visitante.component';


const routes: Routes = [
  { path: 'inicio', component: HomeComponent},
  { path: 'crud', component: MantenimientoComponent ,
    children: [
      { path: 'players', component: PlayersComponent},
      { path: 'clubs', component: ClubsComponent},
      { path: 'competitions', component: CompetitionsComponent},
      { path: 'squads', component: SquadsComponent},
      { path: 'referees', component: RefereesComponent}
    ]
  },
  { path: 'crudadm', component: MantenimientoadmComponent ,
    children: [
      { path: 'playersadm', component: PlayersadmComponent},
      { path: 'clubsadm', component: ClubsadmComponent},
      { path: 'competitionsadm', component: CompetitionsadmComponent},
      { path: 'squadsadm', component: SquadsadmComponent},
      { path: 'refereesadm', component: RefereesadmComponent}
    ]
  },
  { path: 'partido', component: SimulatorComponent ,
    children: [
      { path: 'selector', component: SelectorComponent},
      { path: 'selectorVisitante', component: SelectorVisitanteComponent},
      { path: 'matchday', component: MatchdayComponent},
      { path: 'manager', component: ManagerComponent}
    ]
  },
  {
    path: '**',
    redirectTo: 'inicio',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}

