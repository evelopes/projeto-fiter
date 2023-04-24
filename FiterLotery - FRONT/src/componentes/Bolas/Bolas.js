import React, { useState } from 'react';
import './Bolas.css';

function Bolas(props) {
  const [selecionada, setSelecionada] = useState(false);

 
  const cor = selecionada ? 'azulClaro' : 'azulEscuro';

  return (
    <div className={`bola ${cor}`}  title={`${props.numero}`}>
      <p>{props.numero}</p>
    </div>
  );
}

export default Bolas;
