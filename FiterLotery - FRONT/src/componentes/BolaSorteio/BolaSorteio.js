import React, { useState } from 'react';
import './BolaSorteio.css'

function Bola(props) {
  const [selecionada, setSelecionada] = useState(false);

  const handleClick = () => {
    setSelecionada(!selecionada);
    if (props.onBolaClicada) {
      props.onBolaClicada(!selecionada);
    }
  };


  return (
    <div className={`bola laranja`} onClick={handleClick} title={`${props.numero}`}>
      <p>{props.numero}</p>
    </div>
  );
}

export default Bola;
