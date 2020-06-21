import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Boss } from "./boss.interface";
import { BossListModule } from "./boss.action";

// Création d'un EntityState pour la variable bosses in store
export interface BossListStateEntity extends EntityState<Boss> {
  loading: boolean;
  loaded: boolean;
  selectBoss: Boss;
  logs: {
    type: string;
    message: string;
  };
}

export function selectBossId(a: Boss): number {
  //In this case this would be optional since primary key is id
  return a.Id;
}

//Création de l'Entity permettant de lier la variable bosses avec son EntityState
export const BossListAdapter: EntityAdapter<Boss> = createEntityAdapter<Boss>({
  selectId: selectBossId,
  sortComparer: false
});

// Initial state of the EntityState
export const initialState: BossListStateEntity = BossListAdapter.getInitialState({
  loading: false,
  loaded: false,
  selectBoss: undefined,
  logs: undefined
});

// Récupère tous les selectors
export const {
  selectAll: selectBosses
} = BossListAdapter.getSelectors();

// Liste des reducers en fonction des actions
export function bossesReducer(
  state = initialState,
  action: BossListModule.Actions
): BossListStateEntity {

  //Action en fonction de l'action
  switch (action.type) {

    case BossListModule.ActionTypes.LOAD_INIT_BOSSES:
      // Lorsque LOAD_INIT_BOSSES est lancé, passe loading à true
      return {
        ...state,
        loading: true
      };

    case BossListModule.ActionTypes.SUCCESS_INIT_BOSSES:
      // Lorsque SUCCESS_INIT_BOSSES est lancé, passe loading à false
      // rempli la variable bosses du store avec le payload envoyé 
      // passe loaded à true
      return {
        ...BossListAdapter.addMany(action.payload, state),
        loading: false,
        loaded: true,
      };

    case BossListModule.ActionTypes.LOAD_DELETE_BOSS:
      // Lorsque LOAD_DELETE_BOSS est lancé, passe loading à true
      return {
        ...state,
        loading: true
      };

    case BossListModule.ActionTypes.SUCCESS_DELETE_BOSS:
      // Lorsque SUCCESS_DELETE_BOSS est lancé, passe loading à false
      // remove le boss de la variables bosses du store
      // Ajouter un message dans logs pour confimer le succes du delete
      return {
        ...BossListAdapter.removeOne(action.payload, state),
        logs: { type: 'SUCCESS', message: 'Le boss a été supprimée avec succès' }
      };

    case BossListModule.ActionTypes.LOAD_CREATE_BOSS:
      // Lorsque LOAD_CREATE_BOSS est lancé, passe loading à true
      return {
        ...state,
        loading: true
      };

    case BossListModule.ActionTypes.SUCCESS_CREATE_BOSS:
      // Lorsque SUCCESS_CREATE_BOSS est lancé, passe loading à false
      // Ajoute le boss à la variable bosses du store
      // Ajoute un message dans logs pour confimer le succès de l'ajout
      return {
        ...BossListAdapter.addOne(action.payload, state),
        loading: false,
        logs: { type: 'SUCCESS', message: 'Le boss a été créée avec succès' },
      };

    case BossListModule.ActionTypes.ERROR_LOAD_ACTION:
      // Lorsque ERROR_LOAD_ACTION est lancé, passe loading à false
      // Ajoute un message dans logs pour noter qu'une erreur est survenue
      return {
        ...state,
        logs: { type: 'ERROR', message: action.payload.message },
        loading: false
      };

    default:
      //Si aucune action, return le state d'origine
      return state;
  }
}