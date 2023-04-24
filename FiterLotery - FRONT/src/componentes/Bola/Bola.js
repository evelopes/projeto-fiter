import React, { useState } from 'react';
import './Bola.css';

function Bola(props) {
  const [selecionada, setSelecionada] = useState(false);

  const handleClick = () => {
    setSelecionada(!selecionada);
    if (props.onBolaClicada) {
      props.onBolaClicada(!selecionada, props.numero);
    }
  };

  const cor = selecionada ? 'laranja' : 'azulEscuro';

  return (
    <div className={`bola ${cor}`} onClick={handleClick} title={`${props.numero}`}>
      <p>{props.numero}</p>
    </div>
  );
}

export default Bola;
