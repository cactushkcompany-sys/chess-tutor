declare module 'chess.js' {
  export class Chess {
    constructor(fen?: string);
    fen(): string;
    move(move: string | { from: string; to: string; promotion?: string }): any;
    moves(options?: { verbose?: boolean }): any[];
    get(square: string): any;
    in_check(): boolean;
    in_checkmate(): boolean;
    game_over(): boolean;
    turn(): 'w' | 'b';
  }
}

declare module 'react-chessboard' {
  import { FC } from 'react';
  
  interface ChessboardProps {
    position?: string;
    onPieceDrop?: (sourceSquare: string, targetSquare: string) => boolean;
    boardWidth?: number;
    lightSquareStyle?: React.CSSProperties;
    darkSquareStyle?: React.CSSProperties;
    customBoardStyle?: React.CSSProperties;
  }
  
  export const Chessboard: FC<ChessboardProps>;
}

declare module 'fireworks-js' {
  export interface FireworksOptions {
    autoresize?: boolean;
    opacity?: number;
    acceleration?: number;
    friction?: number;
    gravity?: number;
    particles?: number;
    traceLength?: number;
    traceSpeed?: number;
    explosion?: number;
    intensity?: number;
    flickering?: number;
    lineStyle?: string;
    hue?: { min: number; max: number };
    delay?: { min: number; max: number };
    rocketsPoint?: { min: number; max: number };
    lineWidth?: {
      explosion?: { min: number; max: number };
      trace?: { min: number; max: number };
    };
    brightness?: { min: number; max: number };
    decay?: { min: number; max: number };
    mouse?: {
      click?: boolean;
      move?: boolean;
      max?: number;
    };
  }
  
  export class Fireworks {
    constructor(container: HTMLElement, options?: FireworksOptions);
    start(): void;
    stop(): void;
  }
}
