import React from 'react';

type ModeProps = {
  mode: string,
  onClickMode: () => void
};

/**
 * React component Mode (para o Modo de Erros e o Modo Rápido)
 */
export const Mode = (props: ModeProps) => {
  return (
    <div className={ props.mode === 'mistakes'
                      ? "status__action-mistakes-mode"
                      : "status__action-fast-mode"}>
      <label className={ props.mode === 'mistakes'
                          ? "status__action-mistakes-mode-switch"
                          : "status__action-fast-mode-switch"}>
        <input type="checkbox" />
        <span className={ props.mode === 'mistakes'
                            ? "status__action-mistakes-mode-slider"
                            : "status__action-fast-mode-slider"}
              onClick={props.onClickMode}
        ></span>
      </label>
      <p className="status__action-text">{ props.mode === 'mistakes'
                  ? 'Modo de Erros'
                  : 'Modo Rápido'}</p>
    </div>
  )
}
