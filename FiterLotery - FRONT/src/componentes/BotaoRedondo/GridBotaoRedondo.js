import React, { useState } from 'react';
import './BotaoRedondo.css';


function GridBotaoRedondo() {
  const [clickedNumbers, setClickedNumbers] = useState([]);

  function handleClick(number) {
    if (clickedNumbers.includes(number)) {
      setClickedNumbers(clickedNumbers.filter((n) => n !== number));
    } else {
      setClickedNumbers([...clickedNumbers, number]);
    }
  }

  return (
    <div className="grid-botao-redondo">
      {Array.from({ length: 25 }, (_, i) => (
        <botaoRedondo
          key={i}
          number={i + 1}
          pressed={clickedNumbers.includes(i + 1)}
          onClick={handleClick}
        />
      ))}
    </div>
  );
}

export default GridBotaoRedondo;
