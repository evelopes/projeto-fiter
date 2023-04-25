import Ticket from "../Ticket/Ticket"
import '../Ticket/Ticket.css';
import './Dados.css'
import React, { useState, useCallback, useEffect } from "react";

function Dados(props) {
    const [tickets, setTickets] = useState([]);
    const [numeroTicket, setNumeroTicket] = useState(0);
    const [valorTotal, setValorTotal] = useState(0);
    const [total, setTotal] = useState([0]);
    const [statusCompra, setStatusCompra] = useState();
    const [bolasSelecionadasPorTicket, setBolasSelecionadasPorTicket] = useState({});

    console.log(bolasSelecionadasPorTicket)


    const handleBolasSelecionadasChange = (bolasSelecionadas, numeroTicket) => {
        setBolasSelecionadasPorTicket((prevState) => ({
            ...prevState,
            [numeroTicket]: bolasSelecionadas,
        }));
    };

    const onBolasSelecionadasChange = (bolasSelecionadas, numeroTicket) => {
        setBolasSelecionadasPorTicket(bolasSelecionadasPorTicket => ({ ...bolasSelecionadasPorTicket, [numeroTicket]: bolasSelecionadas }));
    };

    const pegaValor = (valorTicketD, numero) => {
        const novoArray = [...total];
        if (novoArray[numero + 1]) {
            novoArray[numero + 1] = valorTicketD;
        } else {
            novoArray.push(valorTicketD)
        }
        setTotal(novoArray);
    };

    useEffect(() => {
        const novoValorTotal = total.reduce((a, b) => a + b, 0);
        setValorTotal(novoValorTotal);
    }, [total]);

    useEffect(() => {
        props.onNumeroTicket(numeroTicket);
    }, [numeroTicket, props.onNumeroTicket]);

    useEffect(() => {
        props.onAtualizaSaldo(valorTotal);
    }, [statusCompra]);

    const adicionaTicket = useCallback(() => {
        const novoNumeroTicket = numeroTicket + 1
        setNumeroTicket(novoNumeroTicket);
        const novoTicket = <Ticket numero={numeroTicket} key={novoNumeroTicket} valorTotal={valorTotal} onPegaValor={pegaValor}
        bolasSelecionadas={bolasSelecionadasPorTicket[novoNumeroTicket]}
            onBolasSelecionadasChange={(bolasSelecionadas) => onBolasSelecionadasChange(bolasSelecionadas, novoNumeroTicket)}
            />;
        setTickets((tickets) => [...tickets, novoTicket]);
    }, [valorTotal, numeroTicket]);
    
    
    const comprarTickets = async () => {
        try {
            const response = await fetch('http://localhost:3001/user/Eve/saldo/retirar', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ saldo: valorTotal })
            });

            if (!response.ok) {
                throw new Error(`Erro ao retirar saldo: ${await response.text()}`);
            }
            const responseBody = await response.text();
           setStatusCompra(responseBody.status)
           console.log('cheguei aqui')
           await gerarTickets();            
           console.log('final' + numeroTicket)
        } catch (error) {
            console.error(error);
        }
    }


    async function gerarTickets() {   
        for (let index = 1; index <= numeroTicket; index++) {                  
          let objeto = {selectedNumbers :  bolasSelecionadasPorTicket[index]};
            try {
                const response = await fetch('http://localhost:3001/tickets', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(objeto)
                });
                const data = await response.json();
                console.log(data);
            } catch (error) {
                console.error(error);
            }
            
        }
        }
        




    return (
        <div className="Dados">
            <div className="menu">
                <p className="dados bilhetes"><a href="/" >Bilhetes</a></p>
                <p className="dados bilhetes"><a href="/resultados" > Resultados</a></p>
            </div>

            <div className="TicketsDados">
                {tickets}
                <button className="novoTicket" onClick={adicionaTicket}><p>Adicionar bilhete <img src='/imagens/apostasativas.svg' alt='adicionar bilhetes'></img></p>
                    <p><img src="/imagens/adicionar.svg" alt="adicionar bilhete"></img></p></button>
            </div>
            <h2 className="total"> Valor total: <span className="green"> R$ {valorTotal}</span></h2>
            <div className="TicketsCompras"><button className="comprarTickets" onClick={comprarTickets} >Comprar Tickets</button>

            </div>
            {statusCompra && <p className="statusCompra">{statusCompra}</p>}

            <span className="informacoes"><img src="/imagens/informacao.svg" alt="informacao" />  valores bilhetes: 15 números - R$ 3,00 | 16 números - R$100,00  | 17 números - R$300,00 | 18 números - R$5.000,00 | 19 números - R$15.000,00 | 20 números - R$25.000,00    </span>
        </div>
    )
}

export default Dados
