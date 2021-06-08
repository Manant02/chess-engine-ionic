import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlayerVsPlayerPageRoutingModule } from './player-vs-player-routing.module';

import { PlayerVsPlayerPage } from './player-vs-player.page';

import { BoardComponent } from '../board/board.component';
import { StartComponent } from './start/start.component';
import { ChessGame } from '../chess-game/chess-game';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlayerVsPlayerPageRoutingModule
  ],
  declarations: [
    PlayerVsPlayerPage,
    BoardComponent,
    StartComponent
  ]
})
export class PlayerVsPlayerPageModule {}
