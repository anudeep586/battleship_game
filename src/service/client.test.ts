import { Grid } from "./grid";

describe('Grid', () => {

    test('initalized correctly or not',()=>{
      const grid = new Grid(5);
      expect(grid.size).toBe(5)
  })

  test('should place a ship on the grid',()=>{
    const grid = new Grid(5);
    grid.placeShip(2,3)
    expect(grid.grid[2][3]).toBe('B')
  })

  test('should fire a missile',()=>{
    const grid = new Grid(5);
    grid.placeShip(2,3)
    grid.fireMissile(2,3)
    expect(grid.grid[2][3]).toBe('X')
  })

  test('should fire a missile but should miss',()=>{
    const grid = new Grid(5);
    grid.placeShip(2,3)
    grid.fireMissile(1,3)
    expect(grid.grid[2][3]).toBe('B')
  })
  });