// ============================ Interfaces ============================

export interface Move {
    piece: number;  // piece ID
    orig: number[];  // origin coordinates (board indicies)
    dest: number[];  // destination coordinates (board indicies)
}


// ============================ ChessGame ============================

export class ChessGame {
    /**
     * This ChessGame class provides functions to exectute a game of chess. No game data is stored in this class.
     * The game data is meant to be stored and taken care of externally, such that it fits your needs. ChessGame functions
     * then act upon that data via functionparameter inputs and return outputs.
     * 
     * 
     * Game data: For a chess game to be fully described in any state you have to store the following 4 variables:
     *   
     *   -board: number[][]; is a 8 by 8 number array of piece IDs (see below) storing the current chessboard.
     *   -whiteMove: boolean; is a boolean indicating which color is to move. true: white to move, false: black to move.
     *   -previousMove: Move; is a Move object (see interface above) storing the previous move, used for en passant.
     *   -castle: boolean[][]; is an array of booleans indicating whether castling is still allowed or not.
     *      first dim:  [black, white]
     *      second dim: [kingside, queenside]
     *      (example): castle = [[true, false], [false, true]];  // black is only allowed to caslte kingside, white only queenside
     * 
     * 
     * Piece IDs: Pieces are given IDs as follows:
     * 
     *   11: empty field
     * 
     *   _4: pawn
     *   _5: rook
     *   _6: knight
     *   _7: bishop
     *   _8: Queen
     *   _9: King
     * 
     *   2_: white
     *   3_: black
     * 
     */
        
    constructor() { }
    
    initializeBoard(layout: string = "default"): number[][] {
        
        let board: number[][];
        switch (layout) {
            case "default":
                board = [[35, 36, 37, 38, 39, 37, 36, 35],
                [34, 34, 34, 34, 34, 34, 34, 34],
                [11, 11, 11, 11, 11, 11, 11, 11],
                [11, 11, 11, 11, 11, 11, 11, 11],
                [11, 11, 11, 11, 11, 11, 11, 11],
                [11, 11, 11, 11, 11, 11, 11, 11],
                [24, 24, 24, 24, 24, 24, 24, 24],
                [25, 26, 27, 28, 29, 27, 26, 25]];        
                break;
            case "empty":
                board = [[11, 11, 11, 11, 11, 11, 11, 11],
                [11, 11, 11, 11, 11, 11, 11, 11],
                [11, 11, 11, 11, 11, 11, 11, 11],
                [11, 11, 11, 11, 11, 11, 11, 11],
                [11, 11, 11, 11, 11, 11, 11, 11],
                [11, 11, 11, 11, 11, 11, 11, 11],
                [11, 11, 11, 11, 11, 11, 11, 11],
                [11, 11, 11, 11, 11, 11, 11, 11]];        
                break;
                    
            default:
                // TODO: implement FEN-support
                console.error(`initializeBoard Error: '${layout}' is not a valid FEN-string or defined layout`)
                break;
        }
                    
        return board;
    }

    makeMove(move: Move, board: number[][], whiteMove: boolean, previousMove: Move, castle: boolean[][]): 
        [number[][], boolean, Move, boolean[][]] {
        
        let possibleMoves: Move[] = this.getMoves(move.orig, board, previousMove, castle);
        if(!this.moveInList(move, possibleMoves)) {
            throw "Move not possible!"
        }
        board[move.dest[0]][move.dest[1]] = board[move.orig[0]][move.orig[1]];
        board[move.orig[0]][move.orig[1]] = 11;
        // TODO: castling
        whiteMove = !whiteMove;
        previousMove = move;
        return [board, whiteMove, previousMove, castle];
    }

    getMoves(pcCoords: number[], 
        board: number[][], 
        previousMove: Move, 
        castle: boolean[][]): Move[] {
        
        let possibleMoves: Move[] = this.getPossibleMoves(pcCoords, board, previousMove, castle);
        let moves: Move[] = [];
        for (let mv of possibleMoves) {
            let boardCopy: number[][] = JSON.parse(JSON.stringify(board));
            boardCopy[mv.dest[0]][mv.dest[1]] = boardCopy[mv.orig[0]][mv.orig[1]];
            boardCopy[mv.orig[0]][mv.orig[1]] = 11;
            // TODO: castling
            let color: number = Math.floor(mv.piece / 10) == 2 ? 0 : 1;  // 0: white, 1: black
            if (!this.getCheckStatus(boardCopy, mv, castle)[color]) moves.push(mv);
        }

        return moves;
    }
    
    getCheckStatus(board: number[][], 
        previousMove: Move, 
        castle: boolean[][]): boolean[] {
        
        let whiteInCheck: boolean = false;
        let blackInCheck: boolean = false;
        for (let r = 0; r < 8; r++) {
            for (let c = 0; c < 8; c++) {
                let pcColor = Math.floor(board[r][c] / 10);
                if (pcColor === 1) continue;
                for (let potMove of this.getPossibleMoves([r,c], board, previousMove, castle)) {
                    let destPc: number = board[potMove.dest[0]][potMove.dest[1]]
                    switch (pcColor) {
                        case 2:
                            if (destPc === 39) whiteInCheck = true;
                            break;
                        case 3:
                            if (destPc === 29) blackInCheck = true;
                            break;
                        default:
                            console.error(`getCheckStatus Error: pcColor=${pcColor} not 2 (white) or 3 (black).`);
                            break;
                    }
                }
            }
        }
        return [blackInCheck, whiteInCheck];
    }

    getCheckmateStatus(board: number[][], 
        previousMove: Move, 
        castle: boolean[][]): boolean[] {
        
        let whiteInMate: boolean = true;
        let blackInMate: boolean = true;

        for (let r = 0; r < 8; r++) {
            for (let c = 0; c < 8; c++) {
                let pcColor = Math.floor(board[r][c] / 10);
                if (pcColor === 1) continue;
                switch (pcColor) {
                    case 2:
                        if (this.getMoves([r,c], board, previousMove, castle).length != 0) whiteInMate = false;
                        break;
                    case 3:
                        if (this.getMoves([r,c], board, previousMove, castle).length != 0) blackInMate = false;
                        break;
                    default:
                        console.error(`getCheckmateStatus Error: pcColor=${pcColor} not 2 (white) or 3 (black).`);
                        break;
                }
                if (!whiteInMate && !blackInMate) break;
            }
            if (!whiteInMate && !blackInMate) break;
        }
        console.log(`blackInMate: ${blackInMate}`);
        console.log(`whiteInMate: ${whiteInMate}`);
        return [blackInMate, whiteInMate];

    }
      
    getKingPosition(board: number[][]): number[][] {
        let kingPosition: number[][] = [[], []];
        for (let r = 0; r < 8; r++) {
            for (let c = 0; c < 8; c++) {
                switch (board[r][c]) {
                    case 29:
                        kingPosition[1] = [r,c];
                        break;
                    case 39:
                        kingPosition[0] = [r,c];
                        break;                
                    default:
                        break;
                }
            }
        }
        // TODO: assert that kingPositions were found
        return kingPosition;
    }

    private getPossibleMoves(pcCoords: number[], 
        board: number[][], 
        previousMove: Move, 
        castle: boolean[][]): Move[] {
        
        let possibleMoves: Move[];
        let pc = board[pcCoords[0]][pcCoords[1]] % 10;  // piece type number
        switch (pc) {
            case 4:  // pawn
                possibleMoves = this.getMovesPawn(pcCoords, board, previousMove);
                break;
            
            case 5:  // rook
                possibleMoves = this.getMovesRook(pcCoords, board);
                break;
            
            case 6:  // knight
                possibleMoves = this.getMovesKnight(pcCoords, board);
                break;
            
            case 7:  // bishop
                possibleMoves = this.getMovesBishop(pcCoords, board);
                break;

            case 8:  // queen
                possibleMoves = this.getMovesQueen(pcCoords, board);
                break;

            case 9:  // king
                possibleMoves = this.getMovesKing(pcCoords, board, castle);
                break;
        
            default:
                console.error("getMoves Error: '", pc, "' not a valid piece")
                break;
        }
        return possibleMoves;
    }


    // ============================ Piece moves ============================

    private getMovesKing(pcCoords: number[], 
        board: number[][],
        castle: boolean[][]): Move[] {
        
        let valid_moves: Move[] = [];
        let pc: number = board[pcCoords[0]][pcCoords[1]];
        let pcColor: number = Math.floor(pc / 10);  // piece color number
        for (let inc of [[0,-1], [0,1], [-1,-1], [1,1], [-1,0], [1,0], [-1,1], [1,-1]]) {
                let dest: number[] = this.sumNumArr(pcCoords, inc);
                if (!this.onBoard(dest) || Math.floor(board[dest[0]][dest[1]] / 10) === pcColor) continue;
                valid_moves.push({piece: pc, orig: pcCoords, dest: dest});            
        }
        // TODO: castling
        return valid_moves;
    }

    private getMovesQueen(pcCoords: number[], board: number[][]): Move[] {
        
        let valid_moves: Move[] = [];
        let pc: number = board[pcCoords[0]][pcCoords[1]];
        let pcColor: number = Math.floor(pc / 10);  // piece color number
        let increments: number[][] = [[1,0], [0,1], [-1,0], [0,-1], [1,1], [-1,1], [-1,-1], [1,-1]];
        for (let inc of increments) {
            let multiple = 1;
            while (true) {
                let dest: number[] = this.sumNumArr(pcCoords, this.facNumArr(inc, multiple));
                if (!this.onBoard(dest) || Math.floor(board[dest[0]][dest[1]] / 10) === pcColor) break;
                if (Math.floor(board[dest[0]][dest[1]] / 10) != 1) {
                    valid_moves.push({piece: pc, orig: pcCoords, dest: dest}); 
                    break;
                }
                valid_moves.push({piece: pc, orig: pcCoords, dest: dest}); 
                multiple++;
            }
        }
        return valid_moves;
    }

    private getMovesBishop(pcCoords: number[], board: number[][]): Move[] {

        let valid_moves: Move[] = [];
        let pc: number = board[pcCoords[0]][pcCoords[1]];
        let pcColor: number = Math.floor(pc / 10);  // piece color number
        let increments: number[][] = [[1,1], [-1,1], [-1,-1], [1,-1]];
        for (let inc of increments) {
            let multiple = 1;
            while (true) {
                let dest: number[] = this.sumNumArr(pcCoords, this.facNumArr(inc, multiple));
                if (!this.onBoard(dest) || Math.floor(board[dest[0]][dest[1]] / 10) === pcColor) break;
                if (Math.floor(board[dest[0]][dest[1]] / 10) != 1) {
                    valid_moves.push({piece: pc, orig: pcCoords, dest: dest}); 
                    break;
                }
                valid_moves.push({piece: pc, orig: pcCoords, dest: dest}); 
                multiple++;
            }
        }
        return valid_moves;
    }

    private getMovesKnight(pcCoords: number[], board: number[][]): Move[] {
        
        let valid_moves: Move[] = [];
        let pc: number = board[pcCoords[0]][pcCoords[1]];
        let pcColor: number = Math.floor(pc / 10);  // piece color number
        for (let inc of [[-2,-1], [-2,1], [2,-1], [2,1], [-1,-2], [1,-2], [-1,2], [1,2]]) {
                let dest: number[] = this.sumNumArr(pcCoords, inc);
                if (!this.onBoard(dest) || Math.floor(board[dest[0]][dest[1]] / 10) === pcColor) continue;
                valid_moves.push({piece: pc, orig: pcCoords, dest: dest});            
        }
        return valid_moves;
    }

    private getMovesRook(pcCoords: number[], board: number[][]): Move[] {
        
        let valid_moves: Move[] = [];
        let pc: number = board[pcCoords[0]][pcCoords[1]];
        let pcColor: number = Math.floor(pc / 10);  // piece color number
        let increments: number[][] = [[1,0], [0,1], [-1,0], [0,-1]];
        for (let inc of increments) {
            let multiple = 1;
            while (true) {
                let dest: number[] = this.sumNumArr(pcCoords, this.facNumArr(inc, multiple));
                if (!this.onBoard(dest) || Math.floor(board[dest[0]][dest[1]] / 10) === pcColor) break;
                if (Math.floor(board[dest[0]][dest[1]] / 10) != 1) {
                    valid_moves.push({piece: pc, orig: pcCoords, dest: dest}); 
                    break;
                }
                valid_moves.push({piece: pc, orig: pcCoords, dest: dest}); 
                multiple++;
            }
        }
        return valid_moves;
    }

    private getMovesPawn(pcCoords: number[], 
        board: number[][],
        previousMove: Move): Move[] {
        
        let valid_moves: Move[] = [];
        let pc: number = board[pcCoords[0]][pcCoords[1]];
        let pcColor: number = Math.floor(pc / 10);  // piece color number
        let oppColor: number = pcColor === 2 ? 3 : 2;  // opponent color number
        let fwd: number = pcColor === 2 ? -1 : 1;  // forward direction depending on color
        let homerow: number = pcColor === 2 ? 6 : 1;  // pawn starting row depending on color 

        var dest: number[] = this.sumNumArr(pcCoords, [1*fwd, 0]);
        if (this.onBoard(dest) && Math.floor(board[dest[0]][dest[1]] / 10) === 1) {  // one square fwd
            valid_moves.push({piece: pc, orig: pcCoords, dest: dest});
            dest = this.sumNumArr(dest, [1*fwd, 0]);
            if (this.onBoard(dest) && pcCoords[0] === homerow && Math.floor(board[dest[0]][dest[1]] / 10) === 1) {  // two sqares fwd
                valid_moves.push({piece: pc, orig: pcCoords, dest: dest});
            }
            dest = this.sumNumArr(dest, [-1*fwd, 0]);
        }
        dest = this.sumNumArr(dest, [0, 1]);
        if (this.onBoard(dest) && Math.floor(board[dest[0]][dest[1]] / 10) === oppColor) {  // right diagonal
            valid_moves.push({piece: pc, orig: pcCoords, dest: dest});
        }
        dest = this.sumNumArr(dest, [0, -2]);
        if (this.onBoard(dest) && Math.floor(board[dest[0]][dest[1]] / 10) === oppColor) {  // left diagonal
            valid_moves.push({piece: pc, orig: pcCoords, dest: dest});
        }
        // // left diagonal en passant
        // if (this.onBoard(dest) && 
        //     this.isMoveEqual(previousMove, {piece: 10*oppColor+4, orig: this.sumNumArr(dest, [0, 1*fwd]), dest: this.sumNumArr(dest, [0, -1*fwd])}) &&
        //     Math.floor(board[dest[0]][dest[1]] / 10) === 1) {
        //     valid_moves.push({piece: pc, orig: pcCoords, dest: dest});
        // }
        // // right diagonal en passant
        // dest = this.sumNumArr(dest, [0, 2]);
        // if (this.onBoard(dest) && 
        //     this.isMoveEqual(previousMove, {piece: 10*oppColor+4, orig: this.sumNumArr(dest, [0, 1*fwd]), dest: this.sumNumArr(dest, [0, -1*fwd])}) &&
        //     Math.floor(board[dest[0]][dest[1]] / 10) === 1) {
        //     valid_moves.push({piece: pc, orig: pcCoords, dest: dest});
        // }
        return valid_moves;
    }


    // ============================ Helper functions ============================

    private onBoard(pos: number[]): boolean {
        /* 
        * Checks if position is on board .
        */
        return pos[0] < 8 && pos[0] >=0 && pos[1] < 8 && pos[1] >=0;
    }

    private sumNumArr(arr1: number[], arr2: number[]): number[] {
        /*
        * Sums up two number arrays element-wise and returns result.
        */
        return arr1.map((a, i) => a + arr2[i]);
    }

    private facNumArr(arr: number[], fac: number): number[] {
        /*
        * Multiplies number array by a factor element-wise and returns result.
        */
       return arr.map((a) => fac*a);
    }

    private moveInList(move: Move, moveList: Move[]): boolean {
        /*
        * Checks if Array of moves (moveList) includes move.
        */
       for (let mv of moveList) {
           if (mv.piece == move.piece && mv.orig[0] == move.orig[0] && mv.orig[1] == move.orig[1] && 
            mv.dest[0] == move.dest[0] && mv.dest[1] == move.dest[1]) {
                return true;
            }
       }
       return false;
    }

    private isMoveEqual(m1: Move, m2: Move): boolean {
        return m1.piece == m2.piece && m1.orig[0] == m2.orig[0] && m1.orig[1] == m2.orig[1] && m1.dest[0] == m2.dest[0] && m1.dest[1] == m2.dest[1]
    }



}