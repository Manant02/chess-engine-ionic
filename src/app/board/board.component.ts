import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ChessGameService } from '../chess-game/chess-game.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {

  clickState: number;  // 0: select piece, 1: select destination, 2: do nothing (game over)
  selectedPiece: number[];  // [row, column]
  moveDestinations: number[][];
  checkPositions: number[][];  // [black[r,c], white[r,c]]

  constructor(public chessService: ChessGameService, public alertController: AlertController) {
    this.clickState = 0;
    this.moveDestinations = [[]];
    this.selectedPiece = [];
    this.checkPositions = [[]];
   }

  ngOnInit() {}

  click(r: number, c: number) {

    switch (this.clickState) {
      case 0:
        // check if clicked piece is of color to move:
        if(Math.floor(this.chessService.board[r][c] / 10) + Number(this.chessService.whiteMove) === 3 ) {
          this.moveDestinations = this.chessService.getMoveDests([r, c]);
          this.selectedPiece = [r, c];
          this.clickState = 1;
        }
        break;

      case 1:
        let mateStatus: boolean[];
        if(this.moveDestinations.some(d => d[0] == r && d[1] == c)) {
          mateStatus = this.chessService.makeMove(this.selectedPiece, [r,c]);
          this.checkPositions = this.chessService.getCheckPositions();
          this.moveDestinations = [[]];
          this.selectedPiece = [];
          this.clickState = 0;
          if (mateStatus[0] || mateStatus[1]) {
            this.clickState = 2;
            this.gameOver(mateStatus);
          }
        } else {
          this.moveDestinations = [[]];
          this.selectedPiece = [];
          this.clickState = 0;
        }
        break;

      case 2:
        break;
    
      default:
        console.error("clickState error")
        break;
    }
  }

  async gameOver(mateStatus: boolean[]) {
    let winner: string = mateStatus[0] ? "White" : "Black";
    const alert = await this.alertController.create({
      header: 'Checkmate',
      message: `${winner} won!`,
      buttons: [{text: 'Ok'}]
    });
    await alert.present();
  }

  showCircle(r: number, c: number): boolean {
    return this.selectedPiece[0] == r && this.selectedPiece[1] == c;
  }

  showDot(r: number, c: number): boolean {
    return this.moveDestinations.some(d => d[0] == r && d[1] == c);
  }

  showCross(r: number, c: number): boolean {
    return this.checkPositions.some(d => d[0] == r && d[1] == c);
  }

}
