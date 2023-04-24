import React from 'react';
import Card from '../Card/Card';
import '../Card/Card.css';


function Banner(props) {
  const [saldoTotal, setSaldoTotal] = React.useState(0)
  const [resultado, setResultado] = React.useState({});
  const [apostas, setApostas] = React.useState({})
  const [totalApostas, setTotalApostas] = React.useState(0);


  async function pegarSorteio() {
    try {
      const response = await fetch("http://localhost:3001/sorteios/sorteios");
      const json = await response.json();
      await setResultado(json);
    } catch (error) {
      console.log(error);
    }
  }


  const pegarApostas = async (betId) => {

    if (!isNaN(betId)) {
      try {
        const sorteioCorreto = betId + 1;
        const response = await fetch(`http://localhost:3001/tickets/${sorteioCorreto}`);
        const json = await response.json();
        setApostas(json);
      } catch (error) {
        console.log(error);
      }
    }
  }





  React.useEffect(() => {
    setTotalApostas(apostas.length && apostas.length > 0 && !isNaN(apostas.length) ? apostas.length : 0);
  }, [apostas]);

  React.useEffect(() => {
    setSaldoTotal(props.saldo)
    pegarSorteio();
    pegarApostas(resultado.betId);
  }, [props]);

  const apostasAtivas = `${props.numeroTicket + totalApostas} apostas ativas`;

  return (
    <div className="titulo">
      <h1>{props.nome}</h1>

      <div className='cards'>
        <Card titulo="apostas ativas" src="imagens/apostasativas.svg" alt="apostas ativas" textoFinal={apostasAtivas} />
        <Card titulo="saldo" src="/imagens/saldo.svg" alt="saldo" textoFinal={`R$ ${saldoTotal}`} />
        <Card titulo="lucro" src="/imagens/lucro.svg" alt="lucro" textoFinal="0" />

      </div>
    </div>
  )
}

export default Banner