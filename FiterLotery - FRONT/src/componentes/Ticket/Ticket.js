import React, { useState, useEffect } from 'react';
import Bola from '../Bola/Bola';



function Ticket(props) {
    const { numero, onPegaValor, onBolasSelecionadasChange } = props;
    const [selecionadas, setSelecionadas] = useState(0);
    const [valorTicket, setValorTicket] = useState(0);
    const [bolasSelecionadas, setBolasSelecionadas] = useState([]);
    const [numeroBilhete, setNumeroBilhete] = useState(1)

    const bolas = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];

    const bolaClicada = (selecionada, numero) => {
        if (selecionada) {
            setBolasSelecionadas([...bolasSelecionadas, numero]);
        } else {
            setBolasSelecionadas(bolasSelecionadas.filter(bola => bola !== numero));
        }
        setSelecionadas(selecionadas + (selecionada ? 1 : -1));
    };



    const valores = {
        15: 3,
        16: 100,
        17: 300,
        18: 5000,
        19: 15000,
        20: 25000,
    };

    useEffect(() => {
        const novoValorTicket = valores[selecionadas] || 0;
        setValorTicket(novoValorTicket);
        onPegaValor(novoValorTicket, numero);
        setNumeroBilhete(numero + 1)
        onBolasSelecionadasChange(bolasSelecionadas, numero);
    }, [selecionadas]);



    return (
        <div className="Ticket">
            <div className="head">
                <span className="tituloTicket">Bilhete #<span>{numeroBilhete}</span></span>
                <span className="tituloTicket">Valor: <span className="green">R$ {valorTicket}</span></span>
            </div>
            <span className="numeros">Selecionados:<span>{selecionadas > 20 ? ' além do limite permitido!' : selecionadas}</span></span>
            <div className='escolhidas'>{bolas.map((bola) => <Bola key={bola} numero={bola} onBolaClicada={bolaClicada} />)}
            </div>
        </div>
    )
}

export default Ticket;
