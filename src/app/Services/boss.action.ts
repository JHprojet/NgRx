import { HttpErrorResponse } from '@angular/common/http';
import { Boss } from "./boss.interface";

export namespace BossListModule {

  export enum ActionTypes {
    LOAD_INIT_BOSSES = '[bossList] Load Init Bosses',  
    SUCCESS_INIT_BOSSES = '[bossList] Success Init Bosses',
    LOAD_DELETE_BOSS = '[bossList] Load Delete Boss',
    SUCCESS_DELETE_BOSS = '[bossList] Success Delete Boss',
    LOAD_CREATE_BOSS = '[bossList] Load Create Boss',
    SUCCESS_CREATE_BOSS = '[bossList] Success Create Boss',
    ERROR_LOAD_ACTION = '[bossList] Error Load Action'
  }

  // Action de charger tous les boss
  export  class  LoadInitBosses {
    readonly  type = ActionTypes.LOAD_INIT_BOSSES;
  }

  // Action si succes du chargement de tous les boss
  export  class  SuccessInitBosses {
    readonly  type = ActionTypes.SUCCESS_INIT_BOSSES;
    constructor( public payload: Boss[]) {}
  }

  // Action de delete un boss
  export class LoadDeleteBoss {
    readonly type = ActionTypes.LOAD_DELETE_BOSS;
    constructor(public payload: number) {}
  }

  // Action si success de delete boss
  export class SuccessDeleteBoss {
    readonly type = ActionTypes.SUCCESS_DELETE_BOSS;
    constructor(public payload: number) {}
  }

  // Action de créer un nouveau boss
  export class LoadCreateBoss {
    readonly type = ActionTypes.LOAD_CREATE_BOSS;
    constructor(public payload: Boss) {}
  }

  // Action succès de création d'un nouveau boss
  export class SuccessCreateBoss {
    readonly type = ActionTypes.SUCCESS_CREATE_BOSS;
    constructor(public payload: Boss) {}
  }

  // Action si erreur lors d'une action
  export class ErrorLoadAction {
    readonly type = ActionTypes.ERROR_LOAD_ACTION;
    constructor(public payload: HttpErrorResponse) {}
  }

  // export de toutes les actions via Actions
  export type Actions = LoadInitBosses | ErrorLoadAction | SuccessInitBosses | LoadCreateBoss
    | SuccessCreateBoss |  LoadDeleteBoss
    | SuccessDeleteBoss;
}