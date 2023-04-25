import React from 'react';
import BolaSorteio from '../BolaSorteio/BolaSorteio'
import '../BolaSorteio/BolaSorteio.css'
import './sorteio.css'

const Sorteio = ({ onSorteio, childToParent }) => {
  const [resultado, setResultado] = React.useState({});
  const [bolasSorteadas, setBolasSorteadas] = React.useState([]);
  const [novoSorteio, setNovoSorteio] = React.useState(false);




  React.useEffect(() => {
    pegarSorteio()
    setBolasSorteadas(resultado.winningNumbers || []);
    onSorteio();
    childToParent(resultado.winningNumbers)
  }, [novoSorteio]);



  async function pegarSorteio() {
    try {
      const response = await fetch("http://localhost:3001/sorteios/sorteios");
      const json = await response.json();
      await setResultado(json);
    } catch (error) {
      console.log(error);
    }
  }

  function enviarNovoSorteio() {
    const novoSorteio = {
      winningNumbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
    };
    fetch('http://localhost:3001/sorteios', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(novoSorteio)
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error(error));
  }

  async function atualizaSaldo(novoSaldo) {
    const url = 'http://localhost:3001/Eve/saldo';
    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ saldo: novoSaldo })
    };
  
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      console.log(data.message);
    } catch (error) {
      console.error(error);
    }
  }
  



  async function verificarResultados(betId) {
    try {
      const response = await fetch(`http://localhost:3001/compare/${betId}`);
      const data = await response.json();
      if (data.resultados.length > 0) {
        for (const resultado of data.resultados) {
          if (resultado.matchedNumbers >= 11) {
            atualizaSaldo(resultado.premio);
          }
        }
      }
    } catch (error) {
      console.error(error);
    }
  }
  


  async function sortearEHandleClick() {
    await enviarNovoSorteio();
    await pegarSorteio();
    setNovoSorteio(!novoSorteio);
    onSorteio();
    verificarResultados(resultado.betId)
  }





  return (
    <div className="sorteio">
      <div className="boxSorteio">
        {bolasSorteadas.length > 0 && <p className='bilheteSorteio'>Aposta: #{resultado.betId}</p>}
        {bolasSorteadas.length > 0 && <p className='bilheteSorteio'>Números Sorteados</p>}

        <div className="bolasSorteadas">
          {bolasSorteadas.map(numero => (
            <BolaSorteio numero={numero} key={numero} />
          ))}
        </div>
        <button className="buttonSortear" onClick={sortearEHandleClick}> Sortear Aposta! </button>
      </div>


    </div>
  );
};

export default Sorteio;
