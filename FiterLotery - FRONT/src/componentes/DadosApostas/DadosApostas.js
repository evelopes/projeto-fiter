import '../DadosApostas/DadosApostas.css'
import ItensTabela from './ItensTabela';
import React, { useState, useEffect } from 'react';

const DadosApostas = ( dados) => {
  const [sorteio, setSorteio] = useState({})
  const [apostas, setApostas] = useState({})
  const [compare, setCompare] = useState({})

  const pegarSorteio = async () => {
    try {
      const response = await fetch("http://localhost:3001/sorteios/sorteios");
      const json = await response.json();
      setSorteio(json);
    } catch (error) {
      console.log(error);
    }
  }

  const pegarApostas = async (betId) => {
    if (!isNaN(betId)) {
      try {
        const response = await fetch(`http://localhost:3001/tickets/${betId}`);
        const json = await response.json();
        setApostas(Object.values(json));
      } catch (error) {
        console.log(error);
      }
    }
  }


  useEffect(() => {
    pegarSorteio();
  }, []);


  useEffect(() => {
    const sorteioCorreto = sorteio.betId + 1;
    pegarApostas(sorteioCorreto)
  }, [sorteio]);


  useEffect(() => {
    if (dados && sorteio.betId) {
      const fetchCompare = async () => {
        try {
          const sorteioCorreto = sorteio.betId + 1;
          const response = await fetch(`http://localhost:3001/compare/${sorteioCorreto}`);
          const json = await response.json();
          setCompare(json);
        } catch (error) {
          console.log(error);
        }
      };

      fetchCompare();
    }
  }, [dados, sorteio.betId]);



  function formatarData(date) {
    const data = new Date(date);
    const dia = data.getDate().toString().padStart(2, '0');
    const mes = (data.getMonth() + 1).toString().padStart(2, '0');
    const ano = data.getFullYear();
    return `${dia}/${mes}/${ano}`;

  }


  let totalPremio = 0;
  useEffect(() => {
    
    let Premios = Object.values(compare).reduce((acumulador, item) => {
      if (item.premio) {
        return acumulador + item.premio;
      }
      return acumulador;
    }, 0);
    
    totalPremio = (compare) && compare ? Premios : 0;
  }, [sorteio]);


  let totalBilhetesPremiados = 0;
  useEffect(() => {
    
    let Premios = Object.values(compare).reduce((acumulador, item) => {
      if (item.premio) {
        return acumulador + item.premio;
      }
      return acumulador;
    }, 0);
    
    totalPremio = (compare) && compare ? Premios : 0;
  }, [sorteio]);

  return (
    <>


      <span className='TituloTabela'><span>Aposta</span><span>Preço</span><span>Data</span><span>Selecionados</span><span className='numerosTicket'></span></span>
      {apostas.length > 0 ? (
        apostas.map((aposta) => (
          <ItensTabela
            key={aposta.ticketId}
            Aposta={aposta.betId}
            Preço={aposta.betValue ? 'R$ ' + aposta.betValue : '' }
            Data={aposta.date ? formatarData(aposta.date) : ''}
            Selecionados={aposta.selectedNumbersCount}
            numerosTicket={aposta.selectedNumbers}
          />
        ))
      ) : (
        <p>Aposta não encontrada</p>
      )}

      {sorteio && <span className='bilhetesPremiados'>Bilhetes Premiados: {totalBilhetesPremiados}   Total do Prêmio: {totalPremio}</span>}

    </>




  );
};

export default DadosApostas;
