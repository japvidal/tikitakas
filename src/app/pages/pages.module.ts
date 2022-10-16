import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


// PAGINAS
import { MantenimientoComponent } from './mantenimiento/mantenimiento.component';
import { SimulatorComponent } from './simulator/simulator.component';
import { MantenimientoadmComponent } from './mantenimientoadm/mantenimientoadm.component';
import { HomeComponent } from './home/home.component';
import { MaterialModule } from '../shared/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { PipesModule } from '../pipes/pipes.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../app.module';
import { CrudModule } from '../crud/crud.module';
import { CrudadmModule } from '../crudadm/crudadm.module';
import { GameModule } from '../game/game.module';



@NgModule({
  declarations: [
    HomeComponent,
    MantenimientoadmComponent,
    MantenimientoComponent,
    SimulatorComponent
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
    CrudModule,
    CrudadmModule,
    GameModule,
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
    HomeComponent,
    MantenimientoadmComponent,
    MantenimientoComponent,
    SimulatorComponent
  ]
})
export class PagesModule { }
