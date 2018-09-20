import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeroesComponent } from './components/heroes/heroes.component';

import { FilterPipe } from './modules/filter';

import { DataService } from './services/data.service';
import { SidenavComponent } from './components/sidenav/sidenav/sidenav.component';
import { RelatedHeroesComponent } from './components/sidenav/related-heroes/related-heroes.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    FilterPipe,
    SidenavComponent,
    RelatedHeroesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
