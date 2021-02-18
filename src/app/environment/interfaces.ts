export interface Position {
    row: number;
    col: number;
}

// export necessary?
export interface Move {
    piece: Piece;
    current: Position;
    future: Position;
}

// TODO: interface for Castling

export interface Piece {
    readonly name:  string;
    readonly id: number;
    readonly img:  string;
    readonly color:  string;
    position: Position;
    getMoves(board: Board): Move[]; // TODO: add parameters for castling & en passent (e.g. previous move)
}

export interface Board {
    [index: number]: Piece[];
    // at(position: Position): Piece;
}