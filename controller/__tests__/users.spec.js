const UserServices = require('../../services/UserServices');
const bcrypt = require('bcrypt');

const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require('../users');

jest.mock('../../services/UserServices', () => ({
  getUsers: jest.fn(),
  getUserById: jest.fn(),
  getUserByEmail: jest.fn(),
  createUser: jest.fn(),
  updateUser: jest.fn(),
  deleteUser: jest.fn(),
}));

const req = {};
const res = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe('getUsers', () => {
  it('deve obter a coleção de usuário', async () => {
    const mockUsers = [
      {
        _id: '123',
        email: 'admin@localhost.com',
        role: 'admin',
      },
      {
        _id: '124',
        email: 'admin@localhost',
        role: 'admin',
      },
    ];

    // definindo o retorno do mock
    UserServices.getUsers.mockResolvedValue(mockUsers);

    await getUsers(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockUsers);
    // expect(users.length).toBe(2);
  });

  it('deve retornar 500 e uma mensagem de erro se ocorrer um erro', async () => {
    const errorMessage = 'Erro ao buscar usuários';

    // Definindo o retorno do mock
    UserServices.getUsers.mockRejectedValue(new Error(errorMessage));

    await getUsers(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
  });
});

describe(' getUserById', () => {
  it('tem que obter o usuário pelo ID', async () => {
    const mockUsers = {
      _id: '661590a33f7a3dbdf69788fa',
      email: 'admin@localhost.com',
      password: '$2b$10$bYYW6Wugx1p4nvhV10dGMOOu3WYvliAtETIOCQjQJcS5O1h01Qe.u',
      role: 'admin',
    };

    UserServices.getUserById.mockResolvedValue(mockUsers);
    const req = {
      params: { uid: '661590a33f7a3dbdf69788fa' },
    };

    await getUserById(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockUsers);
  });

  it('deve retornar 404 e uma mensagem de erro se ocorrer um erro', async () => {
    const errorMessage = 'Erro ao buscar usuários';

    // Definindo o retorno do mock
    UserServices.getUserById.mockRejectedValue(new Error(errorMessage));
    const req = {
      params: { uid: '661590a33f7a3dbdf69788fa' },
    };
    await getUserById(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
  });
});

describe('createUser', () => {
  beforeEach(() => {
    bcrypt.genSalt = jest.fn().mockResolvedValue('genSalt');
    bcrypt.hashSync = jest.fn().mockResolvedValue('hashedPassword');
  });

  it('deve ser criado um usuário', async () => {
    const mockUsers = {
      // _id: '661590a33f7a3dbdf69788fa',
      email: 'admin@localhost.com',
      password: '$2b$10$bYYW6Wugx1p4nvhV10dGMOOu3WYvliAtETIOCQjQJcS5O1h01Qe.u',
      role: 'admin',
    };
    UserServices.createUser.mockResolvedValue(mockUsers); // consulta o banco de dados.
    UserServices.getUserByEmail.mockResolvedValue(null);
    const req = {
      body: { email: 'admin@localhost.com', password: '12345', role: 'admin' },
    };
    await createUser(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ data: mockUsers, status: 'sucesso' });
  });
  it('deve conter o email', async () => {
    UserServices.createUser.mockResolvedValue();
    const req = {
      body: { password: 12345, role: 'admin' },
    };

    await createUser(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'usuário precisa do email, da senha e do role' });
  });
});

describe('updateUser', () => {
  it('precisa atualizar o usário', async () => {
    const mockUsers = {
      email: 'admin@localhost.com',
      password: '$2b$10$bYYW6Wugx1p4nvhV10dGMOOu3WYvliAtETIOCQjQJcS5O1h01Qe.u',
      role: 'admin',
    };
    UserServices.updateUser.mockResolvedValue(mockUsers); // consulta o banco de dados.
    const req = {
      params: { id: 'user_id' },
      body: { email: 'admin@localhost.com', password: '12345', role: 'admin' },
    };

    await updateUser(req, res);
    expect(UserServices.updateUser).toHaveBeenCalledWith(req.params.id, {
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockUsers);
  });
  it('deve retornar 400 se o usuário não for encontrado', async () => { 
    UserServices.updateUser.mockResolvedValue(null); // (null) deveria ser esse?
    const req = {
      params: { id: 'user_id' },
      body: { email: 'admin@localhost.com', password: '12345', role: 'admin' },
    };
    await updateUser(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'precisa do usuário' });
  });

  it('deve retornar 500 se houver um erro', async () => {
    const errorMessage = 'erro ao atualizar o usuário';
    UserServices.updateUser.mockRejectedValue(new Error(errorMessage));
    const req = {
      params: { id: 'user_id' },
      body: { email: 'admin@localhost.com', password: '12345', role: 'admin' },
    };
    await updateUser(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
  });
});

describe('deleteUser', () => {
  it('tem que deletar o usuário', async () => {
    const mockUser = {
      _id: '661590a33f7a3dbdf69788fa',
      email: 'admin@localhost.com',
      password: 12345,
      role: 'admin',
    };
    UserServices.deleteUser.mockResolvedValue(mockUser);
    const req = {
      params: { uid: '661590a33f7a3dbdf69788fa' },
    };
    await deleteUser(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockUser); // aqui tenho que colocar mockUser?
  });
  it('não deve deletar o usuário se ele não existir', async () => {
    UserServices.deleteUser.mockResolvedValue(null);
    const req = {
      params: { email: 'admin@localhost.com', password: 12345, role: 'admin' },
    };
    await deleteUser(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'precisa do usuário' });
  });

  it('deve retornar 500 se ocorrer um erro', async () => {
    // preciso deste mock?
    const errorMessage = 'Erro ao deletar usuário';
    UserServices.deleteUser.mockRejectedValue(new Error(errorMessage)); // Simula um erro?
    const req = {
      params: { email: 'admin@localhost.com', password: 12345, role: 'admin' },
    };
    await deleteUser(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
  });
});
