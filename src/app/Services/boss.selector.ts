import * as fromBosses from './boss.reducer';
import { AppState } from "./index";
import { createSelector } from "@ngrx/store";

// La première fonction amène vers le state bosses
export const selectBossListState$ = (state: AppState) =>  state.bosses;

// Selector pour la liste des boss
export const selectBosses$ = createSelector(
  selectBossListState$,
  fromBosses.selectBosses);

// Selector pour loading
export  const  selectBossesLoading$ =
  createSelector(selectBossListState$, (bosses) =>  bosses.loading);

// Selector pour loaded
export  const  selectBossesLoaded$ =
  createSelector(selectBossListState$, (bosses) =>  bosses.loaded);

// Selector pour logs
export const selectBossesErrors$ =
  createSelector(selectBossListState$, (bosses) => bosses.logs);
