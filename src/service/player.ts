import { Grid } from './grid';

export class Player {
  grid: Grid;
  ships: [number, number][];
  missiles: [number, number][];
  hits: number;

  constructor(gridSize: number, ships: [number, number][], missiles: [number, number][]) {
    this.grid = new Grid(gridSize);
    this.ships = ships;
    this.missiles = missiles;
    this.hits = 0;

    this.ships.forEach(([x, y]) => this.grid.placeShip(x, y));
  }

  // it is like for sure the missiles launched before or after player1 releases(assuming that player2 missiles launched parallel to player1)
  fireAllMissiles(opponent: Player) {
    this.missiles.forEach(([x, y]) => {
      if (opponent.grid.fireMissile(x, y)) {
        this.hits++;
      }
    });
  }
}
