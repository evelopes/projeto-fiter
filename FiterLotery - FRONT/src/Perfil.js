import React from "react";
import './componentes/topo/Topo.css';
import './componentes/Banner/Banner.css';
import './componentes/Card/Card.css';
import './componentes/Dados/Dados.css'
import Topo from './componentes/topo/Topo';
import Dados from './componentes/Dados/Dados';


const Perfil = () => {

  const [numeroTicket, setNumeroTicket] = React.useState(0);
  const [novoSaldo, setNovoSaldo] = React.useState(0);
  function handleNumeroTicket(numeroTicket) {
    setNumeroTicket(numeroTicket)
  }


  function atualizaSaldo(valor) {
    setNovoSaldo(valor)
  }


  return (

    <>
      <Topo nome="Perfil" numeroTicket={numeroTicket} onNumeroTicket={handleNumeroTicket} novoSaldo={novoSaldo} />
      <Dados onNumeroTicket={handleNumeroTicket} onAtualizaSaldo={atualizaSaldo} />

    </>
  )
}

export default Perfil;
