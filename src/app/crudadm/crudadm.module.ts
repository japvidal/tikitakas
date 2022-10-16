import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClubsadmComponent } from './clubsadm/clubsadm.component';
import { CompetitionsadmComponent } from './competitionsadm/competitionsadm.component';
import { PlayersadmComponent } from './playersadm/playersadm.component';
import { RefereesadmComponent } from './refereesadm/refereesadm.component';
import { SquadsadmComponent } from './squadsadm/squadsadm.component';

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



@NgModule({
  declarations: [
    ClubsadmComponent,
    CompetitionsadmComponent,
    PlayersadmComponent,
    RefereesadmComponent,
    SquadsadmComponent
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
    ClubsadmComponent,
    CompetitionsadmComponent,
    PlayersadmComponent,
    RefereesadmComponent,
    SquadsadmComponent
  ]
})

export class CrudadmModule { }
