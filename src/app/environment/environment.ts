import { Position, Piece, Move, Board } from '../environment/interfaces';
import { EmptyBoard, Empty, WhiteKing, BlackKing, WhiteQueen, BlackQueen, WhiteBishop, BlackBishop, WhiteKnight, BlackKnight, WhiteRook, BlackRook, WhitePawn, BlackPawn } from '../environment/pieces';

export class Environment {
    
    board: Board; // TODO: Board as interface, with []operator for Position
    // white_move = true;
    // previous_move = [];
    // castle_kingside = [true, true];
    // castle_queenside = [true, true];

    constructor() {
        this.resetBoard();
    }

    makeMove(move: Move): boolean {
        var valid_moves: Move[] = move.piece.getMoves(this.board);
        if (this.arrContainsMove(valid_moves, move)) {
            // var new_board = this.copyBoard(this.board);
            // new_board[move.future.row][move.future.col] = {...move.piece, position: move.future};
            // new_board[move.current.row][move.current.col] = Empty;
            // new_board[0][0] = BlackQueen;
            var future_piece = this.board[move.future.row][move.future.col]; 
            this.board[move.future.row][move.future.col] = {...move.piece, position: move.future};
            this.board[move.current.row][move.current.col] = Empty;
            if (!this.getCheckStatus(this.board, move.piece.color)) {
                return true;
            } else {
                this.board[move.future.row][move.future.col] = future_piece;
                this.board[move.current.row][move.current.col] = move.piece;
            }
        }
        return false;
    }

    getCheckStatus(board: Board, color: string): boolean {
        var king_position = this.getKingPosition(board, color);
        for (var i = 0; i < 8; i++) {
            for (var j = 0; j < 8; j++) {
                if (board[i][j].color == color || board[i][j].color == "empty") continue;
                for (var potential_check_move of board[i][j].getMoves(board)) {
                    if (this.isPositionEqual(king_position, potential_check_move.future)) return true;
                }
            }
        }
        return false;
    }

    resetBoard() {
        this.board = EmptyBoard;
        this.board[0][0] = {...BlackRook, position: {row: 0, col:0}};
        this.board[0][1] = {...BlackKnight, position: {row: 0, col:1}};
        this.board[0][2] = {...BlackBishop, position: {row: 0, col:2}};
        this.board[0][3] = {...BlackQueen, position: {row: 0, col:3}};
        this.board[0][4] = {...BlackKing, position: {row: 0, col:4}};
        this.board[0][5] = {...BlackBishop, position: {row: 0, col:5}};
        this.board[0][6] = {...BlackKnight, position: {row: 0, col:6}};
        this.board[0][7] = {...BlackRook, position: {row: 0, col:7}};
        
        this.board[7][0] = {...WhiteRook, position: {row: 7, col:0}};
        this.board[7][1] = {...WhiteKnight, position: {row: 7, col:1}};
        this.board[7][2] = {...WhiteBishop, position: {row: 7, col:2}};
        this.board[7][3] = {...WhiteQueen, position: {row: 7, col:3}};
        this.board[7][4] = {...WhiteKing, position: {row: 7, col:4}};
        this.board[7][5] = {...WhiteBishop, position: {row: 7, col:5}};
        this.board[7][6] = {...WhiteKnight, position: {row: 7, col:6}};
        this.board[7][7] = {...WhiteRook, position: {row: 7, col:7}};
        
        for (var i = 0; i < 8; i++) {
            this.board[1][i] = {...BlackPawn, position: {row: 1, col: i}};
            this.board[6][i] = {...WhitePawn, position: {row: 6, col: i}};
        }
        for (var i = 2; i < 6; i++) {
            for (var j = 2; j < 6; j++) {
                this.board[i][j] = Empty;
            }
        }
    }

    getKingPosition(board: Board, color: string): Position {
        for (var i = 0; i < 8; i++) {
            for (var j = 0; j < 8; j++) {
                if (board[i][j].name == "king" && board[i][j].color == color) {
                    return {row: i, col: j};
                }
            }
        }
    }

    copyBoard(board: Board): Board {
        var new_board: Board = EmptyBoard;
        for (var i = 0; i < 8; i++) {
            for (var j = 0; j < 8; j++) {
                new_board[i][j] = {...board[i][j]};
            }
        }
        return new_board;
    }

    copyPiece(piece: Piece): Piece {
        var new_piece: Piece = {
            name: piece.name,
            id: piece.id,
            color: piece.color,
            img: piece.img,
            position: piece.position,
    
            getMoves: piece.getMoves
        }
        return new_piece;
    }
    
    arrContainsMove(arr: Move[], move: Move): boolean {
        for (var x of arr) {
            if (this.isMoveEqual(x, move)) return true;
        }
        return false;
    }

    isMoveEqual(move1: Move, move2: Move): boolean {
        if (move1.piece.id != move2.piece.id) return false;
        if (!this.isPositionEqual(move1.current, move2.current)) return false;
        if (!this.isPositionEqual(move1.future, move2.future)) return false;
        return true;
    }

    isPositionEqual(pos1: Position, pos2: Position): boolean {
        if (pos1.row != pos2.row) return false;
        if (pos1.col != pos2.col) return false;
        return true;
    }

}