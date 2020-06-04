import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AppState} from "../Services/index";
import {Store} from "@ngrx/store";
import {Router} from "@angular/router";
import { Boss } from '../Services/boss.interface';
import { BossListModule } from '../Services/boss.action';
  
@Component({
  selector: 'app-ajout-boss',
  templateUrl: './ajout-boss.component.html',
  styleUrls: ['./ajout-boss.component.css']
})
export class AjoutBossComponent implements OnInit {
  
    public bossForm: FormGroup;
  
    constructor(private router: Router, @Inject(FormBuilder) fb: FormBuilder, private store: Store<AppState>) {
      this.bossForm = fb.group({
        NomEN: ['', Validators.required],
        NomFR: ['', Validators.required]
      });
    }
  
    ngOnInit() {
    }
  
    createBoss(data: Boss) {
      const payload = {
        ...data
      };
      //Lance l'action de création d'un nouveau boss en envoyant les infos du formulaire sous forme d'object
      this.store.dispatch(new BossListModule.LoadCreateBoss(payload));
      //Reset form et retourne sur la page boss
      this.bossForm.reset();
      this.router.navigateByUrl('/boss');
    }
  
  }