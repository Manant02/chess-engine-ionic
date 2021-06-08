import { Injectable } from '@angular/core';
import { Settings } from '../interfaces/interfaces';
import { ChessGame, Move } from './chess-game';

@Injectable({
  providedIn: 'root'
})
export class ChessGameService {

  // Game Variables (game state fully described by these variables)
  board: number[][];
  whiteMove: boolean;
  previousMove: Move;
  castle: boolean[][];  // [black[kingside, queenside], white[kingside, queenside]]

  // Application Data
  // kingPosition: number[][];  // [black, white]
  // isInCheck: boolean[];  // [black, white]


  constructor(private chessGame: ChessGame) { }

  newGame(settings: Settings) {
    this.board = this.chessGame.initializeBoard(settings.layout);
    this.whiteMove = true;
    this.previousMove = null;
    this.castle = [[true, true], [true, true]];
    // this.kingPosition = this.chessGame.getKingPosition();
    // this.isInCheck = this.chessGame.getCheckStatus(this.board, this.previousMove, this.castle);
  }

  endGame() {
    this.board = null;
    this.whiteMove = null;
    this.previousMove = null;
    this.castle = null;
  }
  
  makeMove(pieceCoords: number[], dest: number[]): boolean[] {
    let move: Move = {piece: this.board[pieceCoords[0]][pieceCoords[1]], orig: pieceCoords, dest: dest};
    try {
      [this.board, this.whiteMove, this.previousMove, this.castle] = 
        this.chessGame.makeMove(move, this.board, this.whiteMove, this.previousMove, this.castle);
    } catch(e) {
      console.error(e);
    }
    return this.chessGame.getCheckmateStatus(this.board, this.previousMove, this.castle);
  }
  
  getMoveDests(pcCoords: number[]): number[][] {
    let moves: Move[] = this.chessGame.getMoves(pcCoords, this.board, this.previousMove, this.castle);
    let moveCoords: number[][] = moves.map(m =>  m.dest);
    return moveCoords;
  }

  getCheckPositions(): number[][] {
    let checkStatus: boolean[] = this.chessGame.getCheckStatus(this.board, this.previousMove, this.castle);
    if (checkStatus.every(c => c == false)) {
      return [[]];
    }
    let checkPositions: number[][] = [[],[]];
    for (let i of [0, 1]) {
      if (checkStatus[i === 0 ? 1 : 0]) {
        checkPositions[i] = this.chessGame.getKingPosition(this.board)[i];
      }
    }
    return checkPositions;
  }
  
  getBoard() {
    let boardCopy = JSON.parse(JSON.stringify(this.board));
    return boardCopy;
  }

}
