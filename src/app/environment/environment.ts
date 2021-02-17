export class Environment {
    
    board = [[35, 36, 37, 38, 39, 37, 36, 35],
            [34, 34, 34, 34, 34, 34, 34, 34],
            [11, 11, 11, 11, 11, 11, 11, 11],
            [11, 11, 11, 11, 11, 11, 11, 11],
            [11, 11, 11, 11, 11, 11, 11, 11],
            [11, 11, 11, 11, 11, 11, 11, 11],
            [24, 24, 24, 24, 24, 24, 24, 24],
            [25, 26, 27, 28, 29, 27, 26, 25]];
    // white_move = true;
    // previous_move = [];
    // castle_kingside = [true, true];
    // castle_queenside = [true, true];

    constructor() {

    }

    makeMove(position: Position, future_position: Position) {
        this.board[future_position.row][future_position.col] = this.board[position.row][position.col];
        this.board[position.row][position.col] = 11;
    }

}

export interface Position {
    row: number;
    col: number;
}

interface Piece {
    name: string;
    id: number;
    img: string;
}