import React from 'react';

type HeaderProps = {
  onClick: () => void
};

/**
 * React component Header
 */
export const Header = (props: HeaderProps) => {
  return (
    <header className="header">
      <h1>
        Nan<span className="header__group-one">pu</span><span className="header__group-two">re (Sudoku)</span>
      </h1>
      <h2 onClick={props.onClick}>
        Novo Jogo
      </h2>
    </header>
  )
}
