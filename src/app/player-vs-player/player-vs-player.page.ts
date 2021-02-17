import { Component, OnInit } from '@angular/core';
import { Environment, Position } from '../environment/environment';

@Component({
  selector: 'app-player-vs-player',
  templateUrl: './player-vs-player.page.html',
  styleUrls: ['./player-vs-player.page.scss'],
})
export class PlayerVsPlayerPage implements OnInit {

  // chessBoard = Environment.board;
  env = new Environment();
  show_circle_list: Position[] = [];
  step = 0;
  // 0: select piece to move
  // 1: select destination, execute move
  selected_piece: [number, Position];

  debug: any;

  constructor() { }

  ngOnInit() {
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
    var position = {row: r, col: c};
    this.show_circle_list.push(position);
    this.selected_piece = [this.env.board[r][c], position];
    this.step = 1;
  }

  playerMove(r: number, c: number) {
    this.env.makeMove(this.selected_piece[1], {row: r, col: c});
    this.step = 0;
    this.show_circle_list = [];
  }

  showCircle(r: number, c: number): boolean {
    return this.arrContainsObj(this.show_circle_list, {row: r, col: c});
  }

  arrContainsObj(arr: any[], obj: Position) {
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



}
