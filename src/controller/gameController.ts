import { Player } from '../service/player';
import { Context } from 'koa';
const fs=require('fs');
const path=require('path')

interface GameInput {
  gridSize: number;
  totalShips: number;
  player1Ships: [number, number][];
  player2Ships: [number, number][];
  totalMissiles: number;
  player1Missiles: [number, number][];
  player2Missiles: [number, number][];
}

const parseInputFile = (filePath: string): GameInput => {
  const data = fs.readFileSync(filePath, 'utf-8').split('\n');

  const gridSize = parseInt(data[0]);
  const totalShips = parseInt(data[1]);

  const player1Ships = data[2].split(':').map((pair:any) => {
    const [x, y] = pair.split(',').map(Number);
    return [x, y] as [number, number];
  });

  const player2Ships = data[3].split(':').map((pair:any) => {
    const [x, y] = pair.split(',').map(Number);
    return [x, y] as [number, number];
  });

  const totalMissiles = parseInt(data[4]);

  const player1Missiles = data[5].split(':').map((pair:any) => {
    const [x, y] = pair.split(',').map(Number);
    return [x, y] as [number, number];
  });

  const player2Missiles = data[6].split(':').map((pair:any) => {
    const [x, y] = pair.split(',').map(Number);
    return [x, y] as [number, number];
  });

  return {
    gridSize,
    totalShips,
    player1Ships,
    player2Ships,
    totalMissiles,
    player1Missiles,
    player2Missiles,
  };
};

export const playBattleship = async (ctx: Context) => {
  const inputFile = path.join(__dirname, '../../input/gameInput.txt');
  const gameInput = parseInputFile(inputFile);

  const { gridSize, player1Ships, player2Ships, player1Missiles, player2Missiles } = gameInput;


  // i am imagining both players decided the target places and where there ships are
  const player1 = new Player(gridSize, player1Ships, player1Missiles);
  const player2 = new Player(gridSize, player2Ships, player2Missiles);

  player1.fireAllMissiles(player2);
  player2.fireAllMissiles(player1);

  let result = 'It is a draw';
  if (player1.hits > player2.hits) {
    result = 'Player 1 wins';
  } else if (player2.hits > player1.hits) {
    result = 'Player 2 wins';
  }

  const output = `
Player1
${player1.grid.printGrid()}

Player2
${player2.grid.printGrid()}

P1:${player1.hits}
P2:${player2.hits}
${result}
  `;

  fs.writeFileSync(path.join(__dirname, '../../output/gameOutput.txt'), output);
 // we can do better with error handler logic 
  ctx.body = {
    message: 'Game simulation completed. Check output file for results.',
  };
};
