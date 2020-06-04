import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import {environment} from "./Services/environnement";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {EffectsModule} from "@ngrx/effects";
import {appEffects, getReducers, REDUCER_TOKEN} from "./Services/index";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BossComponent } from './boss/boss.component';
import { AjoutBossComponent } from './ajout-boss/ajout-boss.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BossService } from './Services/boss.service';

@NgModule({
  declarations: [
    AppComponent,
    BossComponent,
    AjoutBossComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    //Importe store et effect
    StoreModule.forRoot(REDUCER_TOKEN),
    EffectsModule.forRoot(appEffects),
    //Infos pour le plugin chrome
    StoreDevtoolsModule.instrument({
      name: '[DEMOANGULAR]',
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production // Restrict extension to log-only mode
    })
  ],
  
  providers: [BossService,
    //Provider pour les reducers
    {
    provide: REDUCER_TOKEN,
    useFactory: getReducers,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
