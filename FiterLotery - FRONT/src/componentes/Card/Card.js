import './Card.css'


const Card = (props) => {
    return (
        <div className="Card">
            <span className='dadosCard'>
                <span className="firstLine"><p className="cardTitulo">{props.titulo}</p> <img src={props.src} alt={props.alt}></img></span>
                <span className="lastLine">{props.textoFinal}</span>
            </span>
        </div>
    )
}

export default Card