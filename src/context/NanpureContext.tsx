import React, { createContext, useContext, useState } from 'react';
import moment from 'moment';

type NanpureContextProps = {
  numberSelected: string,
  setNumberSelected: React.Dispatch<React.SetStateAction<string>>,
  gameArray: string[],
  setGameArray: React.Dispatch<React.SetStateAction<string[]>>,
  difficulty: string,
  setDifficulty: React.Dispatch<React.SetStateAction<string>>,
  timeGameStarted: moment.Moment,
  setTimeGameStarted: React.Dispatch<React.SetStateAction<moment.Moment>>,
  fastMode: boolean,
  setFastMode: React.Dispatch<React.SetStateAction<boolean>>,
  cellSelected: number,
  setCellSelected: React.Dispatch<React.SetStateAction<number>>,
  initArray: string[],
  setInitArray: React.Dispatch<React.SetStateAction<string[]>>,
  won: boolean,
  setWon: React.Dispatch<React.SetStateAction<boolean>>
};


const NanpureContext = createContext<NanpureContextProps>({ numberSelected: '0', setNumberSelected: () => {},
                                                          gameArray: [], setGameArray: () => {},
                                                          difficulty: 'Easy', setDifficulty: () => {},
                                                          timeGameStarted: moment(), setTimeGameStarted: () => {},
                                                          fastMode: false, setFastMode: () => {},
                                                          cellSelected: -1, setCellSelected: () => {},
                                                          initArray: [], setInitArray: () => {},
                                                          won: false, setWon: () => {} });

type NanpureProviderProps = {
  children: React.ReactElement
};

export const NanpureProvider = ({ children }: NanpureProviderProps) => {
  let [ numberSelected, setNumberSelected ] = useState<string>('0');
  let [ gameArray, setGameArray ] = useState<string[]>([]);
  let [ difficulty,setDifficulty ] = useState<string>('Easy');
  let [ timeGameStarted, setTimeGameStarted ] = useState<moment.Moment>(moment());
  let [ fastMode, setFastMode ] = useState<boolean>(false);
  let [ cellSelected, setCellSelected ] = useState<number>(-1);
  let [ initArray, setInitArray ] = useState<string[]>([]);
  let [ won, setWon ] = useState<boolean>(false);

  return (
    <NanpureContext.Provider value={
      {
        numberSelected, setNumberSelected,
        gameArray, setGameArray,
        difficulty,setDifficulty,
        timeGameStarted, setTimeGameStarted,
        fastMode, setFastMode,
        cellSelected, setCellSelected,
        initArray, setInitArray,
        won, setWon
      }
    }>
      {children}
    </NanpureContext.Provider>
  );
};

export const useNanpureContext = (): NanpureContextProps => useContext(NanpureContext);

// Uso
// const { numberSelected, setNumberSelected } = useNumberValue();
