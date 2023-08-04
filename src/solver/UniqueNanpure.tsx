/**
 *  Este arquivo obtém o nanpure resolvido de 'nanpure.js' e
 * gera uma posição única a partir dele.
 */
import { getNanpure } from './nanpure';

/**
 * A posição nanpure é 9x9.
 *    A1 A2 A3 A4 A5 A6 A7 A8 A9
 *    B1 B2 B3 B4 B5 B6 B7 B8 B9
 *    C1 C2 C3 C4 C5 C6 C7 C8 C9
 *    D1 D2 D3 D4 D5 D6 D7 D8 D9
 *    E1 E2 E3 E4 E5 E6 E7 E8 E9
 *    F1 F2 F3 F4 F5 F6 F7 F8 F9
 *    G1 G2 G3 G4 G5 G6 G7 G8 G9
 *    H1 H2 H3 H4 H5 H6 H7 H8 H9
 *    I1 I2 I3 I4 I5 I6 I7 I8 I9
 *
 * Cada bloco pode ser composto por 
 * 9 caixas em uma formação 3x3.
 * Assim:     Box1 Box2 Box3
 *            Box4 Box5 Box6
 *            Box7 Box8 Box9
 *
 * Por sua vez, cada caixa é composta por 9 blocos empilhados
 * em uma formação 3x3 como acima. Isso nos dá a representação
 * abaixo:
 *      Box1        Box2        Box3
 *    A1 A2 A3    A4 A5 A6    A7 A8 A9
 *    B1 B2 B3    B4 B5 B6    B7 B8 B9
 *    C1 C2 C3    C4 C5 C6    C7 C8 C9
 *      Box4        Box5        Box6
 *    D1 D2 D3    D4 D5 D6    D7 D8 D9
 *    E1 E2 E3    E4 E5 E6    E7 E8 E9
 *    F1 F2 F3    F4 F5 F6    F7 F8 F9
 *      Box7        Box8        Box9
 *    G1 G2 G3    G4 G5 G6    G7 G8 G9
 *    H1 H2 H3    H4 H5 H6    H7 H8 H9
 *    I1 I2 I3    I4 I5 I6    I7 I8 I9
 *
 * Por exemplo, Box1 tem as seguintes células:
 * Box1: A1 A2 A3
 *       B1 B2 B3
 *       C1 C2 C3
 *
 * Então, na Caixa1,
 *    Cell1: A1   Cell2: A2   Cell3: A3
 *    Cell4: B1   Cell5: B2   Cell6: B3
 *    Cell7: C1   Cell8: C2   Cell9: C3
 *
 * e na Caixa8,
 *    Cell1: G4   Cell2: G5   Cell3: G6
 *    Cell4: H4   Cell5: H5   Cell6: H6
 *    Cell7: I4   Cell8: I5   Cell9: I6
 *
 * e assim por diante...
 */

/**
 * Inicializa uma matriz nula para redefinições mais fáceis no código.
 */
let nullArray = [ '0', '0', '0', '0', '0', '0', '0', '0', '0',
                  '0', '0', '0', '0', '0', '0', '0', '0', '0',
                  '0', '0', '0', '0', '0', '0', '0', '0', '0',
                  '0', '0', '0', '0', '0', '0', '0', '0', '0',
                  '0', '0', '0', '0', '0', '0', '0', '0', '0',
                  '0', '0', '0', '0', '0', '0', '0', '0', '0',
                  '0', '0', '0', '0', '0', '0', '0', '0', '0',
                  '0', '0', '0', '0', '0', '0', '0', '0', '0',
                  '0', '0', '0', '0', '0', '0', '0', '0', '0' ];

/**
 * Obtém as coordenadas da célula central da caixa especificada.
 */
function _getBoxCenter(box: number) {
  // eslint-disable-next-line
  switch(box) {
    case 0: return [1,1];
    case 1: return [1,4];
    case 2: return [1,7];
    case 3: return [4,1];
    case 4: return [4,4];
    case 5: return [4,7];
    case 6: return [7,1];
    case 7: return [7,4];
    default: return [7,7];
  }
}

/**
 * Obtém o índice da célula fornecida:
 * 1. Box
 * 2. Cell
 */
function _getIndexOfCell(box: number, cell: number) {
  let [row, column] = _getBoxCenter(box);
  // eslint-disable-next-line
  switch(cell) {
    case 0: {row--; column--; break;}
    case 1: {row--; break;}
    case 2: {row--; column++; break;}
    case 3: {column--; break;}
    case 4: {break;}
    case 5: {column++; break;}
    case 6: {row++; column--; break;}
    case 7: {row++; break;}
    case 8: {row++; column++; break;}
  }
  return row * 9 + column;
}

/**
 * Verifica se a célula está disponível ou não (ou seja, preenchida).
 */
function _cellAvailable(tempInitArray: string[], box: number, value: number) {
  return tempInitArray[_getIndexOfCell(box, value)] === '0' ? 0 : 1;
}

/**
 * Gera um quebra-cabeça nanpure único a partir de um nanpure resolvido.
 */
function _generateUniqueNanpure(solvedArray: string[], difficulty: string, e?: React.ChangeEvent<HTMLSelectElement>) {
  let currentDifficulty = difficulty;
  let minimumCells, maximumCells, totalCells, box, cell;

  let tempInitArray = nullArray.slice();
  let boxCounts = [ 0,0,0,
                    0,0,0,
                    0,0,0 ];
  let boxesAvailable = [];
  let cellsAvailable = [];

  if (e)
    currentDifficulty = e.target.value;

  if (currentDifficulty === 'Easy') {
    minimumCells = 3;
    maximumCells = 7;
    totalCells = 45;
  }
  else if (currentDifficulty === 'Medium') {
    minimumCells = 2;
    maximumCells = 6;
    totalCells = 40;
  }
  else {
    minimumCells = 1;
    maximumCells = 5;
    totalCells = 30;
  }

  for (let j = 0; j < 9; j++) {
    boxCounts[j] =  _cellAvailable(tempInitArray, j, 0) +
                    _cellAvailable(tempInitArray, j, 1) +
                    _cellAvailable(tempInitArray, j, 2) +
                    _cellAvailable(tempInitArray, j, 3) +
                    _cellAvailable(tempInitArray, j, 4) +
                    _cellAvailable(tempInitArray, j, 5) +
                    _cellAvailable(tempInitArray, j, 6) +
                    _cellAvailable(tempInitArray, j, 7) +
                    _cellAvailable(tempInitArray, j, 8);
  }

  for (let i = 0; i < totalCells; i++) {
    boxesAvailable = [];
    for (let j = 0; j < 9; j++) {
      if (boxCounts[j] < minimumCells) {
        boxesAvailable.push(j);
      }
    }
    if (boxesAvailable) {
      for (let j = 0; j < 9; j++) {
        if (boxCounts[j] < maximumCells) {
          boxesAvailable.push(j);
        }
      }
    }
    box = boxesAvailable[Math.random() * boxesAvailable.length | 0];

    cellsAvailable = [];
    for (let j = 0; j < 9; j++) {
      if ( tempInitArray[_getIndexOfCell(box, j)] === '0') {
        cellsAvailable.push(j);
      }
    }
    cell = cellsAvailable[Math.random() * cellsAvailable.length | 0];

    let index = _getIndexOfCell(box, cell);
    tempInitArray[index] = solvedArray[index]
    boxCounts[box]++;
  }

  return tempInitArray;
}

export const getUniqueNanpure = (difficulty: string, e?: React.ChangeEvent<HTMLSelectElement>) => {
  let temporaryInitArray = nullArray.slice();
  let temporarySolvedArray = nullArray.slice();
  let nanpure = getNanpure();

  /**
   * Obter nanpure de nanpure.js
   */
  let str = nanpure.generate(60);

  [...str].forEach((value, index) => {
    temporaryInitArray[index] = value === '.'
                        ? '0'
                        : value;
  });

  /**
   * Obtenha a solução de nanpure.js
   */
  str = nanpure.solve(str);
  [...str].forEach((value, index) => {
    temporarySolvedArray[index] = value;
  });

  /**
   * Passe a solução gerada e obtenha dela um nanpure único!
   */
  temporaryInitArray = _generateUniqueNanpure(temporarySolvedArray, difficulty, e);

  return [temporaryInitArray, temporarySolvedArray];
}
