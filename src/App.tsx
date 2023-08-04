import React from 'react';
import { Game } from './Game';
import './App.css';
import { NanpureProvider } from './context/NanpureContext';

/**
 * App é o componente raiz.
 */
export const App: React.FC<{}> = () => {
  return (
    <NanpureProvider>
      <Game />
    </NanpureProvider>
  );
}
