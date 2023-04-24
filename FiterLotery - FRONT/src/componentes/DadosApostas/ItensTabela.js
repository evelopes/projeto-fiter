import Bolas from '../Bolas/Bolas';
import '../DadosApostas/DadosApostas.css'

const ItensTabela = (props) => {
  const data = props.numerosTicket;

  return (
    <div className='itensTabela'>
      <span className='TituloTabela'>
        <span>{props.Aposta}</span>
        <span>{props.Preço}</span>
        <span>{props.Data}</span>
        <span>{props.Selecionados}</span>
        <span className='numerosTicket'>{data && data.map(numero => (<Bolas numero={numero} key={numero}  />))}</span>
      </span>
    </div>






  );
}

export default ItensTabela;
