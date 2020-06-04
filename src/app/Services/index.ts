
import { ActionReducerMap } from '@ngrx/store';
import { InjectionToken } from '@angular/core';
import { BossListEffects } from "./boss.effect";
import { BossListStateEntity, bossesReducer } from "./boss.reducer";

// Récupère tous les reducers
const reducers = {
  bosses: bossesReducer
};

// lie les EntityState avec les variables store
export interface AppState {
  bosses: BossListStateEntity;
}

// Nécéssaire pour l'AOT
export function getReducers() {
  return reducers;
}

// Nécéssaire pour l'AOT
export const REDUCER_TOKEN = new InjectionToken<ActionReducerMap<AppState>>('Registered Reducers');

// récupère tous les effects
export  const  appEffects = [BossListEffects];