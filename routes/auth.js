const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../config');
const { User: UserModel } = require('../model/User');
// const mongo = require('../connect');

const { secret } = config;

module.exports = (app, nextMain) => {
  app.post('/login', async (req, resp, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(400);
    }
    const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    if (!reg.test(email)) {
      return resp.status(400).json({ message: 'email inválido' });
    }
    try {
      // const db = await mongo.connect();

      const user = await UserModel.findOne({ email });

      // const user = await db.collection('users').findOne({ email });
      if (!user) {
        return resp.status(404).json({ message: 'Usuário não encontrado' });
      }
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return resp.status(401).json({ message: 'Senha incorreta' });
      }
      // criando o token
      const token = jwt.sign({
        id: user._id,
        role: user.role,
      }, secret);

      return resp.status(200).json({
        message: 'Usuário encontado',
        accessToken: token,
        user: {
          id: user._id,
          email: user.email,
          role: user.role,
        },
      });
    } catch (error) {
      console.error(error);
    }
    // TODO:Autenticar o usuário
    // É necessário confirmar se o email e senha
    // corresponder a um usuário no banco de dados
    // Se corresponderem, envie um token de acesso criado com JWT
    next();
  });

  return nextMain();
};
