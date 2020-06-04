import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BossComponent } from './boss/boss.component';
import { AjoutBossComponent } from './ajout-boss/ajout-boss.component';

const routes: Routes = [
  { path: '', redirectTo: '/boss', pathMatch: 'full' },
  { path: 'boss', component: BossComponent },
  { path: 'ajout-boss', component: AjoutBossComponent }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
