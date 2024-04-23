const bcrypt = require('bcrypt');
// const { User: UserModel } = require('../model/User');
const UserService = require('../services/UserServices');
// const users = require('../routes/users');

module.exports = {
  getUsers: async (req, resp) => {
    // TODO: Implement the necessary function to fetch the `users` collection or table
    try {
      const users = await UserService.getUsers();
      resp.status(200).json(users);
    } catch (error) {
      resp.status(500).json({ error: error.message });
    }
  },
  getUserById: async (req, resp) => {
    // TODO: Implement the necessary function to fetch the `users` collection or table
    try {
      const users = await UserService.getUserById(req.params.uid);
      resp.status(200).json(users);
    } catch (error) {
      resp.status(500).json({ error: error.message });
    }
  },

  createUser: async (req, resp) => {
    // TODO: Implement the necessary function to fetch the `users` collection or table
    if (!req.body.email || !req.body.password || !req.body.role) {
      return resp.status(400).json({ error: 'usuário precisa do email, da senha e do role' });
    }
    const userExiste = await UserService.getUserByEmail(req.body.email);
    if (userExiste) {
      return resp.status(403).json({ error: 'o email já existe' });
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    try {
      const user = await UserService.createUser({
        email: req.body.email,
        password: hash,
        role: req.body.role,
      });
      resp.status(200).json({ data: user, status: 'sucesso' });
    } catch (error) {
      resp.status(500).json({ error: error.message });
    }
  },
  updateUser: async (req, resp) => {
    // TODO: Implement the necessary function to fetch the `users` collection or table
    try {
      const users = await UserService.updateUser(req.params.uid, {
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
      });
      if (!users) {
        return resp.status(400).json({ error: 'precisa do usuário' });
      }
      resp.status(200).json(users);
    } catch (error) {
      resp.status(500).json({ error: error.message });
    }
  },

  deleteUser: async (req, resp) => {
    // TODO: Implement the necessary function to fetch the `users` collection or table
    try {
      const users = await UserService.deleteUser(req.params.uid);
      if (!users) {
        return resp.status(400).json({ error: 'precisa do usuário' });
      }
      resp.status(200).json(users);
    } catch (error) {
      resp.status(500).json({ error: error.message });
    }
  },

};
