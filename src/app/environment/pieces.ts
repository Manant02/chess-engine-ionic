import { Position, Piece, Move } from '../environment/interfaces';

function onBoard(position: Position): boolean {
    if (position.row >= 0 && position.row < 8 && position.col >= 0 && position.col < 8) return true;
    else return false;
}


export const Empty: Piece = {
    name:  "empty",
    id: 11,
    color:  "empty",
    img:  "../assets/img/pieces/11.png",
    position: null,
    
    getMoves(board: Piece[][]): Move[] {
        return null;
    }
};

export const WhiteKing: Piece = {
    name: "king",
    id: 29,
    color: "white",
    img: "../assets/img/pieces/29.png",
    position: null,
    
    getMoves(board: Piece[][]): Move[] {
        var valid_moves: Move[] = [];
        for (var inc of [[0,-1], [0,1], [-1,-1], [1,1], [-1,0], [1,0], [-1,1], [1,-1]]) {
                var future_position = {...this.position};
                future_position.row += inc[0];
                future_position.col += inc[1];
                if (!onBoard(future_position) || board[future_position.row][future_position.col].color == this.color) continue;
                valid_moves.push({piece: this, current: this.position, future: future_position});            
        }
        return valid_moves;
    }
};

export const BlackKing: Piece = {
    name: "king",
    id: 39,
    color: "black",
    img: "../assets/img/pieces/39.png",
    position: null,
    
    getMoves(board: Piece[][]): Move[] {
        var valid_moves: Move[] = [];
        for (var inc of [[0,-1], [0,1], [-1,-1], [1,1], [-1,0], [1,0], [-1,1], [1,-1]]) {
                var future_position = {...this.position};
                future_position.row += inc[0];
                future_position.col += inc[1];
                if (!onBoard(future_position) || board[future_position.row][future_position.col].color == this.color) continue;
                    valid_moves.push({piece: this, current: this.position, future: future_position});            
        }
        return valid_moves;
    }
};

export const WhiteQueen: Piece = {
    name: "queen",
    id: 28,
    color: "white",
    img: "../assets/img/pieces/28.png",
    position: null,
    
    getMoves(board: Piece[][]): Move[] {
        var valid_moves: Move[] = [];
        var increments: [number, number][] = [[1,0], [0,1], [-1,0], [0,-1], [1,1], [-1,1], [-1,-1], [1,-1]];
        for (var inc of increments) {
            var multiple = 1;
            while (true) {
                var future_position = {...this.position};
                future_position.row += inc[0] * multiple;
                future_position.col += inc[1] * multiple;
                if (!onBoard(future_position) || board[future_position.row][future_position.col].color == this.color) break;
                if (board[future_position.row][future_position.col].color != "empty") {
                    valid_moves.push({piece: this, current: this.position, future: future_position});
                    break;
                }
                valid_moves.push({piece: this, current: this.position, future: future_position});
                multiple++;
            }
        }
        return valid_moves;
    }
};

export const BlackQueen: Piece = {
    name: "queen",
    id: 38,
    color: "black",
    img: "../assets/img/pieces/38.png",
    position: null,
    
    getMoves(board: Piece[][]): Move[] {
        var valid_moves: Move[] = [];
        var increments: [number, number][] = [[1,0], [0,1], [-1,0], [0,-1], [1,1], [-1,1], [-1,-1], [1,-1]];
        for (var inc of increments) {
            var multiple = 1;
            while (true) {
                var future_position = {...this.position};
                future_position.row += inc[0] * multiple;
                future_position.col += inc[1] * multiple;
                if (!onBoard(future_position) || board[future_position.row][future_position.col].color == this.color) break;
                if (board[future_position.row][future_position.col].color != "empty") {
                    valid_moves.push({piece: this, current: this.position, future: future_position});
                    break;
                }
                valid_moves.push({piece: this, current: this.position, future: future_position});
                multiple++;
            }
        }
        return valid_moves;
    }
};


export const WhiteBishop: Piece = {
    name: "bishop",
    id: 27,
    color: "white",
    img: "../assets/img/pieces/27.png",
    position: null,
    
    getMoves(board: Piece[][]): Move[] {
        var valid_moves: Move[] = [];
        var increments: [number, number][] = [[1,1], [-1,1], [-1,-1], [1,-1]];
        for (var inc of increments) {
            var multiple = 1;
            while (true) {
                var future_position = {...this.position};
                future_position.row += inc[0] * multiple;
                future_position.col += inc[1] * multiple;
                if (!onBoard(future_position) || board[future_position.row][future_position.col].color == this.color) break;
                if (board[future_position.row][future_position.col].color != "empty") {
                    valid_moves.push({piece: this, current: this.position, future: future_position});
                    break;
                }
                valid_moves.push({piece: this, current: this.position, future: future_position});
                multiple++;
            }
        }
        return valid_moves;
    }
};

export const BlackBishop: Piece = {
    name: "bishop",
    id: 37,
    color: "black",
    img: "../assets/img/pieces/37.png",
    position: null,
    
    getMoves(board: Piece[][]): Move[] {
        var valid_moves: Move[] = [];
        var increments: [number, number][] = [[1,1], [-1,1], [-1,-1], [1,-1]];
        for (var inc of increments) {
            var multiple = 1;
            while (true) {
                var future_position = {...this.position};
                future_position.row += inc[0] * multiple;
                future_position.col += inc[1] * multiple;
                if (!onBoard(future_position) || board[future_position.row][future_position.col].color == this.color) break;
                if (board[future_position.row][future_position.col].color != "empty") {
                    valid_moves.push({piece: this, current: this.position, future: future_position});
                    break;
                }
                valid_moves.push({piece: this, current: this.position, future: future_position});
                multiple++;
            }
        }
        return valid_moves;
    }
};

export const WhiteKnight: Piece = {
    name: "knight",
    id: 26,
    color: "white",
    img: "../assets/img/pieces/26.png",
    position: null,
    
    getMoves(board: Piece[][]): Move[] {
        var valid_moves: Move[] = [];
        for (var inc of [[-2,-1], [-2,1], [2,-1], [2,1], [-1,-2], [1,-2], [-1,2], [1,2]]) {
                var future_position = {...this.position};
                future_position.row += inc[0];
                future_position.col += inc[1];
                if (!onBoard(future_position) || board[future_position.row][future_position.col].color == this.color) continue;
                    valid_moves.push({piece: this, current: this.position, future: future_position});            
        }
        return valid_moves;
    }
};

export const BlackKnight: Piece = {
    name: "knight",
    id: 36,
    color: "black",
    img: "../assets/img/pieces/36.png",
    position: null,
    
    getMoves(board: Piece[][]): Move[] {
        var valid_moves: Move[] = [];
        for (var inc of [[-2,-1], [-2,1], [2,-1], [2,1], [-1,-2], [1,-2], [-1,2], [1,2]]) {
                var future_position = {...this.position};
                future_position.row += inc[0];
                future_position.col += inc[1];
                if (!onBoard(future_position) || board[future_position.row][future_position.col].color == this.color) continue;
                    valid_moves.push({piece: this, current: this.position, future: future_position});            
        }
        return valid_moves;
    }
};

export const WhiteRook: Piece = {
    name: "rook",
    id: 25,
    color: "white",
    img: "../assets/img/pieces/25.png",
    position: null,
    
    getMoves(board: Piece[][]): Move[] {
        var valid_moves: Move[] = [];
        var increments: [number, number][] = [[1,0], [0,1], [-1,0], [0,-1]];
        for (var inc of increments) {
            var multiple = 1;
            while (true) {
                var future_position = {...this.position};
                future_position.row += inc[0] * multiple;
                future_position.col += inc[1] * multiple;
                if (!onBoard(future_position) || board[future_position.row][future_position.col].color == this.color) break;
                if (board[future_position.row][future_position.col].color != "empty") {
                    valid_moves.push({piece: this, current: this.position, future: future_position});
                    break;
                }
                valid_moves.push({piece: this, current: this.position, future: future_position});
                multiple++;
            }
        }
        return valid_moves;
    }
};

export const BlackRook: Piece = {
    name: "rook",
    id: 35,
    color: "black",
    img: "../assets/img/pieces/35.png",
    position: null,
    
    getMoves(board: Piece[][]): Move[] {
        var valid_moves: Move[] = [];
        var increments: [number, number][] = [[1,0], [0,1], [-1,0], [0,-1]];
        for (var inc of increments) {
            var multiple = 1;
            while (true) {
                var future_position = {...this.position};
                future_position.row += inc[0] * multiple;
                future_position.col += inc[1] * multiple;
                if (!onBoard(future_position) || board[future_position.row][future_position.col].color == this.color) break;
                if (board[future_position.row][future_position.col].color != "empty") {
                    valid_moves.push({piece: this, current: this.position, future: future_position});
                    break;
                }
                valid_moves.push({piece: this, current: this.position, future: future_position});
                multiple++;
            }
        }
        return valid_moves;
    }
};

export const WhitePawn: Piece = {
    name: "pawn",
    id: 24,
    color: "white",
    img: "../assets/img/pieces/24.png",
    position: null,
    
    getMoves(board: Piece[][]): Move[] {
        var valid_moves: Move[] = [];
        var future_position: Position = {...this.position};
        future_position.row += -1;
        if (onBoard(future_position) && board[future_position.row][future_position.col].color == "empty") {
            valid_moves.push({piece: this, current: this.position, future: {...future_position}});
            future_position.row += -1;
            if (onBoard(future_position) && this.position.row == 6 && board[future_position.row][future_position.col].color == "empty") {
                valid_moves.push({piece: this, current: this.position, future: {...future_position}});
            }
            future_position.row += 1;
        }
        future_position.col += 1;
        if (onBoard(future_position) && board[future_position.row][future_position.col].color == "black") {
            valid_moves.push({piece: this, current: this.position, future: {...future_position}});
        }
        future_position.col += -2;
        if (onBoard(future_position) && board[future_position.row][future_position.col].color == "black") {
            valid_moves.push({piece: this, current: this.position, future: {...future_position}});
        }
        return valid_moves;
    }
};

export const BlackPawn: Piece = {
    name: "pawn",
    id: 34,
    color: "black",
    img: "../assets/img/pieces/34.png",
    position: null,
    
    getMoves(board: Piece[][]): Move[] {
        var valid_moves: Move[] = [];
        var future_position: Position = {...this.position};
        future_position.row += 1;
        if (onBoard(future_position) && board[future_position.row][future_position.col].color == "empty") {
            valid_moves.push({piece: this, current: this.position, future: {...future_position}});
            future_position.row += 1;
            if (onBoard(future_position) && this.position.row == 1 && board[future_position.row][future_position.col].color == "empty") {
                valid_moves.push({piece: this, current: this.position, future: {...future_position}});
            }
            future_position.row += -1;
        }
        future_position.col += 1;
        if (onBoard(future_position) && board[future_position.row][future_position.col].color == "white") {
            valid_moves.push({piece: this, current: this.position, future: {...future_position}});
        }
        future_position.col += -2;
        if (onBoard(future_position) && board[future_position.row][future_position.col].color == "white") {
            valid_moves.push({piece: this, current: this.position, future: {...future_position}});
        }
        return valid_moves;
    }
};

export const EmptyBoard: Piece[][]  = [[Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty], 
                                  [Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty],
                                  [Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty],
                                  [Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty],
                                  [Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty],
                                  [Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty],
                                  [Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty],
                                  [Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty],];