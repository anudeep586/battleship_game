export class Grid {
    size: number;
    grid: string[][];
  
    // whatever logic using grid keep it here
    constructor(size: number) {
      this.size = size;
      this.grid = Array.from({ length: size }, () => Array(size).fill('_')) // {player1:{(0,1):''_}}
    }
  
    placeShip(x: number, y: number) {
      this.grid[x][y] = 'B'
    }
  
    fireMissile(x: number, y: number): boolean {
      if (this.grid[x][y] === 'B') {
        this.grid[x][y] = 'X'
        return true;
      } else {
        this.grid[x][y] = 'O'
        return false;
      }
    }
  
    printGrid(): string {
      return this.grid.map(row => row.join(' ')).join('\n')
    }
  }
  