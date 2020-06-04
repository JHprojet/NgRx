import { Component, OnInit } from '@angular/core';
import {Boss} from '../Services/boss.interface';
import {Router} from "@angular/router";
import {Observable} from "rxjs/Rx";
import {AppState} from "../Services/index";
import {select, Store} from "@ngrx/store";
import {BossListModule} from "../Services/boss.action";
import { selectBosses$, selectBossesLoading$} from "../Services/boss.selector";

@Component({
  selector: 'app-boss',
  templateUrl: './boss.component.html',
  styleUrls: ['./boss.component.css']
})
export class BossComponent implements OnInit {

  //Variables pour lié avec selectors
  public bosses$: Observable<Boss[]>;
  public bossesLoading: Observable<boolean>;

  constructor(private router: Router, private store: Store<AppState>) {
    //Selectors de tous les boss
    this.bosses$ = store.pipe(select(selectBosses$));
    //Selectors pour le statut loading
    this.bossesLoading = store.pipe(select(selectBossesLoading$));
  }

  ngOnInit(): void {
    //Lance l'action LoadInitBosses
    this.store.dispatch(new  BossListModule.LoadInitBosses());
  }

  goToAddBoss () {
    this.router.navigateByUrl('/ajout-boss');
  }

  deleteBoss(id: number) {
    //Lance l'action LoadDeleteBoss
    this.store.dispatch(new BossListModule.LoadDeleteBoss(id));
  }

}
