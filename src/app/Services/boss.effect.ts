import { Injectable } from  '@angular/core';
import { Actions, Effect, ofType } from  '@ngrx/effects';
import { Observable } from  'rxjs/Observable';
import { catchError, map, switchMap } from  'rxjs/operators';
import {of} from "rxjs/index";
import { BossService } from "./boss.service";
import {BossListModule} from "./boss.action";

@Injectable()
export  class  BossListEffects {
  // Effect LoadBosses$
  // Ecoute les actions de type LOAD_INIT_BOSSES
  // Si action lancée : lance le getBosses du service via API.
  // Renvois le résultat à l'action SuccessInitBosses
  @Effect() LoadBosses$: Observable<BossListModule.Actions> = this.actions$
    .pipe(
      ofType(BossListModule.ActionTypes.LOAD_INIT_BOSSES),
      switchMap(action  =>  this.bossListService.getBosses()),
      map(bosses => new BossListModule.SuccessInitBosses(bosses)),
      catchError((err) => of(new BossListModule.ErrorLoadAction(err)))
    );

  // Effect LoadCreateBoss$
  // Ecoute les actions de type LOAD_CREATE_BOSS
  // Si action lancée : lance le createBoss du service via API en envoyant le payload de l'action en paramètre (Boss à ajouter).
  // Renvois le résultat à l'action SuccessCreateBosses
  @Effect() LoadCreateBoss$: Observable<BossListModule.Actions> = this.actions$
    .pipe(
      ofType<BossListModule.LoadCreateBoss>(BossListModule.ActionTypes.LOAD_CREATE_BOSS),
      switchMap(action => this.bossListService.createBoss(action.payload)),
      map(boss => new BossListModule.SuccessCreateBoss(boss)),
      catchError((err) => of(new BossListModule.ErrorLoadAction(err)))
    );

  // Effect LoadDeleteBoss$
  // Ecoute les actions de type LOAD_DELETE_BOSS
  // Si action lancée : lance le deleteBoss du service via API en envoyant le payload de l'action en paramètre (id du boss).
  // Renvois le résultat (id du boss delete) à l'action SuccessDeleteBosses
  @Effect() LoadDeleteBoss$: Observable<BossListModule.Actions> = this.actions$
    .pipe(
      ofType<BossListModule.LoadDeleteBoss>(BossListModule.ActionTypes.LOAD_DELETE_BOSS),
      switchMap(action => this.bossListService.deleteBoss(action.payload)),
      map(id => new BossListModule.SuccessDeleteBoss(id)),
      catchError((err) => of(new BossListModule.ErrorLoadAction(err)))
    );
  
  //Constructeur avec le service vers API et les Actions
  constructor(
    private  bossListService: BossService,
    private  actions$: Actions,
  ) {}

}