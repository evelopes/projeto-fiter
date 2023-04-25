const Sorteio = require("../models/sorteioModel");
const Ticket = require("../models/ticketModel")
const router = require('express').Router()

const now = new Date().toISOString();


router.get('/', async (req, res) => {
    try {
        const tickets = await Ticket.find()
        res.status(200).json(tickets)

    } catch (err) {
        res.status(500).json({ error: err })
    }
})

router.get('/:id', async (req, res) => {
    const betId = req.params.id

    try {
        const tickets = await Ticket.find({ betId: betId })
        if (tickets.length == 0) {
            res.status(422).json({ message: 'Ticket não encontrado para esse sorteio!' })
        } else {
            res.status(200).json(tickets)
        }
    } catch (err) {
        res.status(500).json({ error: err })
    }
}

)

router.post('/', async (req, res) => {
    try {
        const ultimoTicket = await Ticket.findOne().sort({ ticketId: -1 }).limit(1);
        let proximoTicketId = 1;
        if (ultimoTicket) {
            proximoTicketId = ultimoTicket.ticketId + 1;
        }

        const ultimoSorteio = await Sorteio.findOne().sort({ betId: -1 }).limit(1);
        let sorteioAtual = Number(ultimoSorteio.betId + 1);

        const ticket = {
            betId: sorteioAtual,
            ticketId: proximoTicketId,
            selectedNumbers: req.body.selectedNumbers || selectedNumbers,
            date: req.body.date || now
        }


        await Ticket.create([ticket])
        res.status(201).json({ message: "Ticket criado com sucesso!" })
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: err })
    }

})


module.exports = router