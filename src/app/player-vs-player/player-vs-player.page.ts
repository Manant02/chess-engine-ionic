import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Environment } from '../environment/environment';
import { Position, Piece, Move } from '../environment/interfaces'; // TODO: infere these from Environment?

@Component({
  selector: 'app-player-vs-player',
  templateUrl: './player-vs-player.page.html',
  styleUrls: ['./player-vs-player.page.scss'],
})
export class PlayerVsPlayerPage implements OnInit {

  env = new Environment();
  show_circle_list: Position[] = [];
  show_dot_list: Position[] = [];
  show_cross_list: Position[] = [];
  step = 0; // 0: select piece to move, 1: select destination, execute move, 2: game over
  turn = "white"; // 0: white to move, 1: black to move
  selected_piece: [Piece, Position];

  debug: any;

  constructor(public alertController: AlertController) { }

  ngOnInit() {
  }

  async alertWin(winner: String) {
    const alert = await this.alertController.create({
      header: `Checkmate`,
      subHeader: `${winner} wins!`,
      message: `Press "OK" to continue`,
      buttons: ['OK']
    });

    await alert.present();
  }

  async alertResignation(winner: String) {
    const alert = await this.alertController.create({
      header: `${winner == "white" || winner == "White" ? "Black" : "White"} resigned`,
      subHeader: `${winner} wins!`,
      message: `Press "OK" to continue`,
      buttons: ['OK']
    });

    await alert.present();
  }

  click(r, c) {
    switch (this.step) {
      case 0:
        this.selectPiece(r, c);
        break;
      case 1:
        this.playerMove(r ,c);
        break;
    }
  }

  selectPiece(r: number, c: number) {
    if (this.env.board[r][c].color != this.turn) return;
    var position = {row: r, col: c};
    this.show_circle_list.push(position);
    for (var move of this.env.board[r][c].getMoves(this.env.board)) {
      if (this.env.isLegalMove(move, this.env.board)) {
        this.show_dot_list.push(move.future);
      }
    }
    this.selected_piece = [this.env.board[r][c], position];
    this.step = 1;
  }

  playerMove(r: number, c: number) {
    var move = {piece: this.selected_piece[0], current: this.selected_piece[1], future: {row: r, col: c}};
    if (this.env.makeMove(move)) {
      if (this.turn == "white") this.turn = "black";
      else this.turn = "white";
      this.show_cross_list = [];
      if (this.env.isCheck(this.env.board, this.turn)) this.show_cross_list.push(this.env.getKingPosition(this.env.board, this.turn));
    }
    this.step = 0;
    this.show_circle_list = [];
    this.show_dot_list = [];
    if (this.env.isCheckmate(this.env.board, this.turn)) {
      this.alertWin(this.turn == "white" ? "Black" : "White")
      this.step = 3;
    }
  }

  playerResignation(color: String) {
    this.alertResignation(color == "white" ? "Black" : "White");
    this.step = 3;
  }

  showCircle(r: number, c: number): boolean {
    return this.arrContainsPos(this.show_circle_list, {row: r, col: c});
  }

  showDot(r: number, c: number): boolean {
    return this.arrContainsPos(this.show_dot_list, {row: r, col: c});
  }

  showCross(r: number, c: number): boolean {
    return this.arrContainsPos(this.show_cross_list, {row: r, col: c});
  }

  arrContainsPos(arr: Position[], obj: Position) {
    var i: number;
    for (i = 0; i < arr.length; i++) {
      if (arr[i].row === obj.row && arr[i].col == obj.col) {
        return true;
      }
    }
    return false;
  }

  test() {
    return null;
  }

  resetBoard() {
    this.env.resetBoard();
    this.turn = "white";
    this.step = 0;
    this.show_cross_list = [];
    this.show_circle_list = [];
    this.show_dot_list = [];
  }



}
