import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PipesModule } from '../pipes/pipes.module';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../app.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MaterialModule } from '../shared/material.module';

import { ClubsComponent } from './clubs/clubs.component';
import { CompetitionsComponent } from './competitions/competitions.component';
import { PlayersComponent } from './players/players.component';
import { RefereesComponent } from './referees/referees/referees.component';
import { SquadsComponent } from './squads/squads.component';

@NgModule({
  declarations: [
    CompetitionsComponent,
    PlayersComponent,
    SquadsComponent,
    ClubsComponent,
    RefereesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,ReactiveFormsModule,
    MatNativeDateModule,
    MaterialModule,
    HttpClientModule,
    CommonModule,
    PipesModule,
    TranslateModule.forRoot({
      defaultLanguage: 'es',
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
  })
  ],
  exports: [
    CompetitionsComponent,
    PlayersComponent,
    SquadsComponent,
    ClubsComponent,
    RefereesComponent
  ]
})
export class CrudModule { }
