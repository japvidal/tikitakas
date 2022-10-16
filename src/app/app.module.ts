import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';

//ROUTING
import { AppRoutingModule } from './app-routing.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';

// TRANSLATE I18N
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

// SHARED
import { MaterialModule } from './shared/material.module';
// PIPES
import { PipesModule } from './pipes/pipes.module';

// SERVICIOS no se importan si se inyectan desde root

// PAGINAS
import { PagesModule } from './pages/pages.module';
// COMPONENTES PROPIOS
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { CrudModule } from './crud/crud.module';
import { CrudadmModule } from './crudadm/crudadm.module';
import { GameModule } from './game/game.module';

// COMPONENTES EXTRAS
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';





@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
  ],
  imports: [
    PagesModule,
    CrudModule,
    CrudadmModule,
    GameModule,
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

