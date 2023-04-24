const router = require('express').Router();
const Ticket = require('../models/ticketModel');
const Sorteio = require('../models/sorteioModel');

router.get('/:betId', async (req, res) => {
    try {
      const tickets = await Ticket.find({ betId: req.params.betId }).exec();
      const sorteio = await Sorteio.findOne({ betId: req.params.betId }).exec();
  
      if (!tickets) {
        return res.status(404).json({ error: `Ticket com betId ${req.params.betId} não encontrado.` });
      }
  
      if (!sorteio) {
        return res.status(404).json({ error: `Sorteio com betId ${req.params.betId} não encontrado.` });
      }
  
      const resultados = tickets.map((ticket) => {
        const selectedNumbers = ticket.selectedNumbers;
        const winningNumbers = sorteio.winningNumbers;
  
        let repetidos = []
        for (let i = 0; i < selectedNumbers.length; i++) {
          if (winningNumbers.includes(selectedNumbers[i])) {
            repetidos.push(selectedNumbers[i]);
          }
        }
  
        const matchCount = repetidos.length;
        const ticketId = ticket.ticketId;

        
        let valor = 0;
        switch (matchCount) {
            case 11:
                valor = 3;
                break;
            case 12:
                valor = 15;
                break;
            case 13:
                valor = 200;
                break;
            case 14:
                valor = 1200;
                break;
            case 15:
                valor = 1500000;
                break;
            default:
                valor = 0;
        }
  
        return {
          betId: req.params.betId,
          ticketId: ticketId,
          matchCount: matchCount,
          matchedNumbers: repetidos,
          premio: valor
        }
      })
  
      res.status(200).json({ resultados });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao comparar os tickets.' });
    }
  });
  

module.exports = router;
