import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChessGameService } from '../../chess-game/chess-game.service';
import { Settings } from '../../interfaces/interfaces';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss'],
})
export class StartComponent implements OnInit {

  layout: string;
  fen: string;
  whiteMove: string;
  previousMove: number[];
  castle: string[];
  rotateBoard: boolean;

  constructor(private chessService: ChessGameService, private router: Router) {
    this.layout = "default";
    this.fen = null;
    this.whiteMove = "white";
    this.previousMove = null;
    this.castle = ["bk", "bq", "wk", "wq"];
    this.rotateBoard = false;
  }

  ngOnInit() {}

  startGame() {
    let sett: Settings = {layout: this.layout == "fen" ? this.fen : this.layout,
                          whiteMove: this.whiteMove === "white" ? true : false, 
                          previousMove: null, 
                          castle: [[false, false], [false, false]], 
                          rotateBoard: this.rotateBoard};
    // TODO: previousMove string[] to [number, number[], number[]] conversion
    sett.castle[0][0] = this.castle.includes("bk") ? true : false;
    sett.castle[0][1] = this.castle.includes("bq") ? true : false;
    sett.castle[1][0] = this.castle.includes("wk") ? true : false;
    sett.castle[1][1] = this.castle.includes("wq") ? true : false;

    this.chessService.newGame(sett);
    this.router.navigateByUrl('/player-vs-player')
  }

}
