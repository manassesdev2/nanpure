import React from 'react';
import { useNanpureContext } from '../context/NanpureContext';

type DifficultyProps = {
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
};

/**
 * React component Difficulty (seletor de dificuldade)
 */
export const Difficulty = (props: DifficultyProps) => {
  let { difficulty } = useNanpureContext();

  return (
    <div className="status__difficulty">
      <span className="status__difficulty-text">Dificuldade:&nbsp;&nbsp;</span>
      <select name="status__difficulty-select" className="status__difficulty-select" defaultValue={difficulty} onChange={props.onChange}>
        <option value="Easy">Fácil</option>
        <option value="Medium">Intermediária</option>
        <option value="Hard">Difícil</option>
      </select>
    </div>
  )
}
