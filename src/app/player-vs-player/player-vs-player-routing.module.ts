import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlayerVsPlayerPage } from './player-vs-player.page';

const routes: Routes = [
  {
    path: '',
    component: PlayerVsPlayerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlayerVsPlayerPageRoutingModule {}
