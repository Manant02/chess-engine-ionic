import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlayerVsPlayerPageRoutingModule } from './player-vs-player-routing.module';

import { PlayerVsPlayerPage } from './player-vs-player.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlayerVsPlayerPageRoutingModule
  ],
  declarations: [PlayerVsPlayerPage]
})
export class PlayerVsPlayerPageModule {}
