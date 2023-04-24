import React, { useState } from 'react';
import './Bolas.css';

function BolasSorteio(props) {
  const [selecionada, setSelecionada] = useState(false);

  const handleClick = () => {
    setSelecionada(!selecionada);
    if (props.onBolaClicada) {
      props.onBolaClicada(!selecionada);
    }
  };

  const cor = selecionada ? 'azulClaro' : 'azulEscuro';

  return (
    <div className={`bola ${cor}`} onClick={handleClick} title={`${props.numero}`}>
      <p>{props.numero}</p>
    </div>
  );
}

export default Bolas;
