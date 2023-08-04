import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Header } from './components/layout/Header';
import { GameSection } from './components/layout/GameSection';
import { StatusSection } from './components/layout/StatusSection';
import { Footer } from './components/layout/Footer';
import { getUniqueNanpure } from './solver/UniqueNanpure';
import { useNanpureContext } from './context/NanpureContext';

/**
 * Game é o componente principal.
 */
export const Game: React.FC<{}> = () => {
  /**
   * Todas as variáveis ​​para manter o estado:
   * gameArray: mantém o estado atual do jogo.
   * initArray: mantém o estado inicial do jogo.
   * solvedArray: mantém a posição resolvida do jogo.
   * difficulty: nível de dificuldade - 'Fácil', 'Intermediário' ou 'Difícil'
   * numberSelected: o número selecionado no Status section.
   * timeGameStarted: hora em que o jogo atual foi iniciado.
   * mistakesMode: erros são permitidos ou não?
   * fastMode: o Modo Rápido está ativado?
   * cellSelected: se uma célula de jogo for selecionada pelo usuário.
   * history: histórico do jogo atual, para fins de 'Desfazer'.
   * overlay: a sobreposição 'Game Solved' está habilitada?
   * won: o jogo está 'ganho'?
   */
  let { numberSelected, setNumberSelected,
        gameArray, setGameArray,
        difficulty, setDifficulty,
        setTimeGameStarted,
        fastMode, setFastMode,
        cellSelected, setCellSelected,
        initArray, setInitArray,
        setWon } = useNanpureContext();
  let [ mistakesMode, setMistakesMode ] = useState<boolean>(false);
  let [ history, setHistory ] = useState<string[][]>([]);
  let [ solvedArray, setSolvedArray ] = useState<string[]>([]);
  let [ overlay, setOverlay ] = useState<boolean>(false);

  /**
   * Cria um novo jogo e inicializa as variáveis ​​de estado.
   */
  function _createNewGame(e?: React.ChangeEvent<HTMLSelectElement>) {
    let [ temporaryInitArray, temporarySolvedArray ] = getUniqueNanpure(difficulty, e);

    setInitArray(temporaryInitArray);
    setGameArray(temporaryInitArray);
    setSolvedArray(temporarySolvedArray);
    setNumberSelected('0');
    setTimeGameStarted(moment());
    setCellSelected(-1);
    setHistory([]);
    setWon(false);
  }

  /**
   * Verifica se o jogo está resolvido.
   */
  function _isSolved(index: number, value: string) {
    if (gameArray.every((cell: string, cellIndex: number) => {
          if (cellIndex === index)
            return value === solvedArray[cellIndex];
          else
            return cell === solvedArray[cellIndex];
        })) {
      return true;
    }
    return false;
  }

  /**
   * Preenche a célula com o 'valor' fornecido
   * Usado para Preencher / Apagar conforme necessário.
   */
  function _fillCell(index: number, value: string) {
    if (initArray[index] === '0') {
      // A cópia direta resulta em um conjunto de problemas, investigue mais!
      let tempArray = gameArray.slice();
      let tempHistory = history.slice();

      // Não é possível usar tempArray aqui, devido ao efeito colateral abaixo!!
      tempHistory.push(gameArray.slice());
      setHistory(tempHistory);

      tempArray[index] = value;
      setGameArray(tempArray);

      if (_isSolved(index, value)) {
        setOverlay(true);
        setWon(true);
      }
    }
  }

  /**
   * 'user fill' será passado para a
   * função _fillCell.
   */
  function _userFillCell(index: number, value: string) {
    if (mistakesMode) {
      if (value === solvedArray[index]) {
        _fillCell(index, value);
      }
      else {
        
      }
    } else {
      _fillCell(index, value);
    }
  }

  /**
   * Ao clicar no link 'Novo Jogo',
   * criar um novo jogo
   */
  function onClickNewGame() {
    _createNewGame();
  }

  /**
   * Ao clicar em uma célula de jogo.
   */
  function onClickCell(indexOfArray: number) {
    if (fastMode && numberSelected !== '0') {
      _userFillCell(indexOfArray, numberSelected);
    }
    setCellSelected(indexOfArray);
  }

  /**
   * Na mudança de Dificuldade,
   * 1. Atualize o nível de 'Dificuldade'
   * 2. Criar novo jogo
   */
  function onChangeDifficulty(e: React.ChangeEvent<HTMLSelectElement>) {
    setDifficulty(e.target.value);
    _createNewGame(e);
  }

  /**
   * Ao clicar no número em Status section,
   * preencha a célula ou defina o número.
   */
  function onClickNumber(number: string) {
    if (fastMode) {
      setNumberSelected(number)
    } else if (cellSelected !== -1) {
      _userFillCell(cellSelected,number);
    }
  }

  /**
   * Ao clicar em Desfazer,
   * para desfazer a alteração mais recente.
   */
  function onClickUndo() {
    if(history.length) {
      let tempHistory = history.slice();
      let tempArray = tempHistory.pop();
      setHistory(tempHistory);
      if (tempArray !== undefined)
        setGameArray(tempArray);
    }
  }

  /**
   * Ao clicar em Apagar,
   * para excluir a célula.
   */
  function onClickErase() {
    if(cellSelected !== -1 && gameArray[cellSelected] !== '0') {
      _fillCell(cellSelected, '0');
    }
  }

  /**
   * Ao clicar em Dica
   * preenche a célula selecionada com o número correto.
   */
  function onClickHint() {
    if (cellSelected !== -1) {
      _fillCell(cellSelected, solvedArray[cellSelected]);
    }
  }

  /**
   * Alternar Modo de Erros
   */
  function  onClickMistakesMode() {
    setMistakesMode(!mistakesMode);
  }

  /**
   * Alternar Modo Rápido
   */
  function onClickFastMode() {
    if (fastMode) {
      setNumberSelected('0');
    }
    setCellSelected(-1);
    setFastMode(!fastMode);
  }

  /**
   * Feche a sobreposição
   */
  function onClickOverlay() {
    setOverlay(false);
    _createNewGame();
  }

  /**
   * Ao carregar, crie um novo jogo.
   */
  useEffect(() => {
    _createNewGame();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className={overlay?"container blur":"container"}>
        <Header onClick={onClickNewGame}/>
        <div className="innercontainer">
          <GameSection
            onClick={(indexOfArray: number) => onClickCell(indexOfArray)}
          />
          <StatusSection
            onClickNumber={(number: string) => onClickNumber(number)}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => onChangeDifficulty(e)}
            onClickUndo={onClickUndo}
            onClickErase={onClickErase}
            onClickHint={onClickHint}
            onClickMistakesMode={onClickMistakesMode}
            onClickFastMode={onClickFastMode}
          />
        </div>
        <Footer />
      </div>
      <div className= { overlay
                        ? "overlay overlay--visible"
                        : "overlay"
                      }
           onClick={onClickOverlay}
      >
        <h2 className="overlay__text">
          Você <span className="overlay__textspan1">resolveu!</span> <span className="overlay__textspan2">Parabéns!</span>
        </h2>
      </div>
    </>
  );
}
