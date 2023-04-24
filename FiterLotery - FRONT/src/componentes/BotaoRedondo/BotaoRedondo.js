import React, { useState } from 'react';
import './BotaoRedondo.css';

function BotaoRedondo({ number, onClick }) {
  const [clicked, setClicked] = useState(false);

  function handleClick() {
    setClicked(true);
    onClick(number);
  }

  return (
    <button
      className={`round-button number ${clicked ? 'bg-color clicked' : 'bg-color'}`}
      onClick={handleClick}
    >
      {number}
    </button>
  );
}

export default BotaoRedondo;