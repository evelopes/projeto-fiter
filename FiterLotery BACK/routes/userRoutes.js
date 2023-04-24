const User = require('../models/userModel');
const router = require('express').Router()


router.get('/', async (req, res) => {
  try {
    const usuarios = await User.find()
    res.status(200).json(usuarios)
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Ocorreu um erro ao buscar os usuários' });
  }
});


router.get('/:usuario', async (req, res) => {
  const usuario = req.params.usuario;

  try {
    const result = await User.find({ usuario: usuario });
    if (!result) {
      return res.status(404).send('Usuário não encontrado');
    }

    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao buscar usuário');
  }
})


router.get('/:userId/saldo', async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await User.findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado, verifique se o _id foi correto!' });
    }

    return res.json({ saldo: user.saldo });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Ocorreu um erro ao buscar o saldo do usuário' });
  }
});


router.post('/', async (req, res) => {
  try {
    const { usuario, email, saldo } = req.body;

    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(409).json({ message: 'Já existe um usuário cadastrado com esse e-mail' });
    }
    
    const user = {
      usuario: usuario,
      email: email,
      saldo: saldo
    };

    await User.create(user)
    res.status(201).json(`Usuário criado com sucesso!`)
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


router.patch('/:user/saldo', async (req, res) => {
  const user = req.params.user;
  const saldo = req.body.saldo;

  if (saldo < 0) {
    return res.status(400).json({ message: 'O saldo não pode ser negativo, retire o OPERADOR (-) NEGATIVO' });
  }

  try {
    const updatedUser = await User.findOneAndUpdate(
      { usuario: user },
      { $inc: { saldo: saldo } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'Usuário não encontrado, verifique se o nome de usuário foi correto!' });
    }

    return res.json({ message: `Saldo atualizado com sucesso! Novo saldo: ${updatedUser.saldo}` });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Ocorreu um erro ao atualizar o saldo do usuário' });
  }
});




router.patch('/:usuario/saldo/retirar', async (req, res) => {
  const usuario = req.params.usuario;
  const saldo = req.body.saldo;

  if (!saldo || saldo <= 0) {
    return res.status(400).json({ message: 'Informe um valor válido para a retirada!' });
  }

  try {
    const user = await User.findOne({ usuario });

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado, verifique se o nome de usuário foi correto!' });
    }

    if (user.saldo < saldo) {
      return res.status(400).json({ message: 'Saldo insuficiente para realizar a operação!' });
    }

    user.saldo -= saldo;
    await user.save();

    return res.json({ message: `Saldo atualizado com sucesso! Novo saldo: ${user.saldo}` });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Ocorreu um erro ao atualizar o saldo do usuário' });
  }
});






module.exports = router;
