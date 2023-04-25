import { useState, useEffect } from "react";
import Banner from "../Banner/Banner";

function Topo(props) {
    const [dados, setDados] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('http://localhost:3001/user/Eve');
                const dados = await response.json();
                setDados({ usuario: dados[0].usuario, saldo: dados[0].saldo });
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [props.numeroTicket, props.novoSorteio]);

    return (
        <>
            <div className="HeaderLogo">
                <div className="logo">
                    <p>fiter<span className="green">lottery</span></p>
                    <img src="/imagens/logo.svg" alt="FiterLottery" />
                </div>
                <div className="botoes">
                    <div className="user">
                        <img src="/imagens/img.png" alt="FiterLottery" className="perfil" />
                        <p className="dadosUser">
                            <span className="userId">ID:{dados ? dados.usuario : 'carregando'}</span>
                            <span className="saldoId green">R$ {dados ? dados.saldo : 'indisponível'}</span>
                        </p>
                        <img src="/imagens/logoout.svg" alt="sair" />
                    </div>
                    <button className="button">
                        <span className="spanButton">
                            Compre ticket! <img src="/imagens/moeda.svg" alt="moeda" />
                        </span>
                    </button>
                </div>
            </div>
            <Banner nome={props.nome} numeroTicket={props.numeroTicket} saldo={dados ? dados.saldo : 'carregando'} />
        </>
    );
}

export default Topo;
