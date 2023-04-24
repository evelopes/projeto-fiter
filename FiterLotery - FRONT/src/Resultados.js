import React from "react";
import './componentes/topo/Topo.css';
import './componentes/Banner/Banner.css';
import './componentes/Card/Card.css';
import './componentes/Dados/Dados.css'
import Topo from  './componentes/topo/Topo';
import Sorteio from "./componentes/sorteio/sorteio";
import DadosResultados from "./componentes/DadosResultados/DadosResultados";
import DadosApostas from "./componentes/DadosApostas/DadosApostas"

const Resultados = () => {
  const [numeroTicket, setNumeroTicket] = React.useState(0);
  function handleNumeroTicket(numeroTicket) {
      setNumeroTicket(numeroTicket)
    }




  const [dados, setDados] = React.useState(false);
  const handleSorteio = () => {
    setDados(true);
  }



  return (
    <>
    
      <Topo nome='Resultados' numeroTicket={numeroTicket} onNumeroTicket={handleNumeroTicket} />
      <div className="DadosResultados">
        <Sorteio onSorteio={handleSorteio}/>
        <DadosResultados />
        <DadosApostas dados={dados}  />
        
        <span className="informacoes"><img src="/imagens/informacao.svg" alt="informacao"/>  valores prêmios: 11 números - R$ 3,00 | 12 números - R$15,00  | 13 números - R$200,00 | 14 números - R$1.200,00 | 15 números - R$1.500.000,00    </span>
      
      </div>
    </>
  )
}

export default Resultados;
