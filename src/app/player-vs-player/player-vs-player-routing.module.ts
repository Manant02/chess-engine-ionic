import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BoardComponent } from '../board/board.component';

import { PlayerVsPlayerPage } from './player-vs-player.page';
import { StartComponent } from './start/start.component';

const routes: Routes = [
  {
    path: '',
    component: PlayerVsPlayerPage
  },
  {
    path: 'start',
    component: StartComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlayerVsPlayerPageRoutingModule {}
