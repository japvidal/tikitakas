import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatchdayComponent } from './matchday/matchday.component';
import { ManagerComponent } from './manager/manager.component';
import { SelectorComponent } from './selector/selector.component';
import { PipesModule } from '../pipes/pipes.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../app.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppComponent } from '../app.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MaterialModule } from '../shared/material.module';
import { SelectorVisitanteComponent } from './selector-visitante/selector-visitante.component';



@NgModule({
  declarations: [
    MatchdayComponent,
    ManagerComponent,
    SelectorComponent,
    SelectorVisitanteComponent
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
    MatchdayComponent,
    ManagerComponent,
    SelectorComponent,
    SelectorVisitanteComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class GameModule { }
