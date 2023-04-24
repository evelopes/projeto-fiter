const Sorteio = require("../models/sorteioModel")
const router = require('express').Router()

const now = new Date().toISOString();

router.get('/', async (req, res) => {
    try {
        const sorteio = await Sorteio.find();
        res.status(200).json(sorteio)

    } catch (error) {
        res.status(500).json({ error: error })

    }

})


router.get('/sorteios', async (req, res) => {
    try {
        const sorteio = await Sorteio.findOne().sort({ betId: -1 }).limit(1);
        res.status(200).json(sorteio)

    } catch (error) {
        res.status(500).json({ error: error })

    }

}
)

router.get('/:betId', async (req, res) => {
    const betId = req.params.betId;
    try {
        const sorteio = await Sorteio.findOne({ betId: betId });
        if (!sorteio) {
            return res.status(404).json({ error: `Sorteio com betId ${betId} não encontrado.` });
        }
        res.status(200).json(sorteio);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});


router.post('/', async (req, res) => {
    try {
        const lastSorteio = await Sorteio.findOne().sort({ betId: -1 }).limit(1);
        let nextBetId = 0;
        if (lastSorteio) {
            nextBetId = lastSorteio.betId + 1;
        }

        let numeros = [];
        while (numeros.length < 15) {
            let num = Math.floor(Math.random() * 25) + 1;
            if (!numeros.includes(num)) {
                numeros.push(num);
            }
        }

        const sorteio = {
            betId: req.body.betId || nextBetId,
            winningNumbers: req.body.winningNumbers || numeros,
            date: req.body.date || now
        }
        await Sorteio.create(sorteio)
        res.status(201).json(`Sorteio criado com sucesso!`)
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

router.delete('/excluir-todos', async (req, res) => {
    try {
      const resultado = await Sorteio.deleteMany();
      res.send(`Excluídos ${resultado.deletedCount} documentos.`);
    } catch (error) {
      console.error(error);
      res.status(500).send('Erro ao excluir documentos.');
    }
  });


module.exports = router