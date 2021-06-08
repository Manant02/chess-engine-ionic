import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ChessGameService } from '../chess-game/chess-game.service';

@Component({
  selector: 'app-player-vs-player',
  templateUrl: './player-vs-player.page.html',
  styleUrls: ['./player-vs-player.page.scss'],
})
export class PlayerVsPlayerPage implements OnInit {

  constructor(private router: Router, private chessService: ChessGameService, public alertController: AlertController) { }

  ngOnInit() {
  }

  async quit() {
    const alert = await this.alertController.create({
      header: 'Quit Game?',
      message: 'All game data will be lost.',
      buttons: [
        {
          text: 'Cancel'
        }, {
          text: 'Quit Game',
          handler: () => {
            this.chessService.endGame();
            this.router.navigateByUrl('/home');
          }
        }
      ]
    });
    await alert.present();
  }

  async handleButtonClick() {
  }

}
