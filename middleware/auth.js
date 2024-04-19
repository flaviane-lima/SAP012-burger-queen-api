const jwt = require('jsonwebtoken');
const { User: UserModel } = require('../model/User');

module.exports = (secret) => (req, resp, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return next();
  }

  const [type, token] = authorization.split(' ');

  if (type.toLowerCase() !== 'bearer') {
    return next();
  }

  jwt.verify(token, secret, async (err, decodedToken) => {
    console.log(decodedToken);
    if (err) {
      return next(403);
    }
    // verificação para ver se o token foi decodificado.
    if (!decodedToken) {
      return next(403);
    }
    
    // verificar se o token tem o uid
    if (!decodedToken.id) {
      return next(403);
    }

    const user = await UserModel.findById(decodedToken.id);
    console.log(user);
    // verificação se existe o usuário
    if (!user) {
      return resp.status(404).json({ message: 'usuário não encontado' });
    }

    req.decodedToken = decodedToken;
    req.role = user.role;

    next();
  });
};

module.exports.isAuthenticated = (req) => {
  if (!req.decodedToken) {
    return false;
  }
  const tempoToken = Math.floor(Date.now() / 84600);
  if (req.decodedToken.iat > tempoToken) {
    return true;
  }
  return false;
};

module.exports.isAdmin = (req) => (
  // TODO: Decida com base nas informações da solicitação se o usuário é um administrador
  req.role === 'admin'

);

module.exports.requireAuth = (req, resp, next) => (
  (!module.exports.isAuthenticated(req))
    ? next(401)
    : next()
);

module.exports.requireAdmin = (req, resp, next) => (
  // eslint-disable-next-line no-nested-ternary
  (!module.exports.isAuthenticated(req))
    ? next(401)
    : (!module.exports.isAdmin(req))
      ? next(403)
      : next()
);
