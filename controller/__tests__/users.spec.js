const UserServices = require('../../services/UserServices');
// const bcrypt = require('bcrypt');

const {
  getUsers,
  getUserById,
  createrUser,
  updateUser,
  deleteUser,
} = require('../users');

jest.mock('../../services/UserServices', () => ({
  find: jest.fn(),
  findByID: jest.fn(),
  create: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  findByIdAndDelete: jest.fn(),
}));

const req = {};
const res = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

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
    getUsers.mockResolvedValue(mockUsers);

    const users = await getUsers(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockUsers);
    expect(users.length).toBe(2);
  });

  it('deve retornar 500 e uma mensagem de erro se ocorrer um erro', async () => {
    const errorMessage = 'Erro ao buscar usuários';

    // Definindo o retorno do mock
    UserServices.find.mockRejectedValue(new Error(errorMessage));

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
      // createdAt:2024-04-09T19:01:55.813+00:00,
      // updatedAt:2024-04-09T19:01:55.813+00:00,
      __v: 0,
    };

    UserServices.find.mockResolvedValue(mockUsers);
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
    UserServices.findByID.mockRejectedValue(new Error(errorMessage));

    await getUserById(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
  });
});

describe('createrUser', () => {
  it('deve ser criado um usuário', async () => {
    const mockUsers = {
      _id: '661590a33f7a3dbdf69788fa',
      email: 'admin@localhost.com',
      password: '$2b$10$bYYW6Wugx1p4nvhV10dGMOOu3WYvliAtETIOCQjQJcS5O1h01Qe.u',
      role: 'admin',
      // createdAt:2024-04-09T19:01:55.813+00:00,
      // updatedAt:2024-04-09T19:01:55.813+00:00,
      __v: 0,
    };
    UserServices.create.mockResolvedValue(mockUsers); // consulta o banco de dados.
    const req = {
      body: { email: 'admin@localhost.com', password: '12345', role: 'admin' },
    };

    await createrUser(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ data: mockUsers, status: 'sucesso' });
  });
  it('deve conter o email', async () => {
    const mockEmail = {
      email: 'admin@localhost.com',
      password: 12345,
      role: 'admin',
    };
    UserServices.create.mockResolvedValue(mockEmail);
    const req = {
      body: { email: 'admin@localhost.com', password: 12345, role: 'admin' },
    };

    await createrUser(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith('usuário precisa do email, da senha e do role');
  });
});

describe('updateUser', () => {
  it('precisa atualizar o suário', async () => {
    const mockUsers = {
      _id: '661590a33f7a3dbdf69788fa',
      email: 'admin@localhost.com',
      password: '$2b$10$bYYW6Wugx1p4nvhV10dGMOOu3WYvliAtETIOCQjQJcS5O1h01Qe.u',
      role: 'admin',
      // createdAt:2024-04-09T19:01:55.813+00:00,
      // updatedAt:2024-04-09T19:01:55.813+00:00,
      __v: 0,
    };
    UserServices.findByIdAndUpdate.mockResolvedValue(mockUsers); // consulta o banco de dados.
    const req = {
      params: { email: 'admin@localhost.com', password: '12345', role: 'admin' },
    };

    await updateUser(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockUsers);
  });
  it('deve retornar 400 se o usuário não for encontrado', async () => {
    const mockEmail = {
      email: 'admin@localhost.com',
      password: 12345,
      role: 'admin',
    };
    UserServices.findByIdAndUpdate.mockResolvedValue(mockEmail); // (null) deveria ser esse?
    const req = {
      body: { email: 'admin@localhost.com', password: 12345, role: 'admin' },
    };
    await updateUser(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith('precisa do usuário'); // ({ error: 'precisa do usuário' })?
  });

  it('deve ter o usuário', async () => {
    const mockEmail = {
      email: 'admin@localhost.com',
      password: 12345,
      role: 'admin',
    };
    UserServices.findByIdAndUpdate.mockResolvedValue(mockEmail);
    const req = {
      body: { email: 'admin@localhost.com', password: 12345, role: 'admin' },
    };
    await updateUser(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith('precisa do usuário');
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
    UserServices.findByIdAndDelete.mockResolvedValue(mockUser);
    const req = {
      params: { uid: '661590a33f7a3dbdf69788fa' },
    };
    await deleteUser(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith('precisa do usuário'); // aqui tenho que colocar mockUser?
  });
  it('não deve deletar o usuário se ele não existir', async () => {
    // preciso deste mock?
    const mockEmail = {
      email: 'admin@localhost.com',
      password: 12345,
      role: 'admin',
    };
    UserServices.findByIdAndDelete.mockResolvedValue(mockEmail);
    const req = {
      params: { email: 'admin@localhost.com', password: 12345, role: 'admin' },
    };
    await deleteUser(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'precisa do usuário' });
  });

  it('deve retornar 500 se ocorrer um erro', async () => {
    // preciso deste mock?
    // const errorMessage = 'Erro ao deletar usuário';
    const mockEmail = {
      email: 'admin@localhost.com',
      password: 12345,
      role: 'admin',
    };
    // UserServices.findByIdAndDelete.mockRejectedValue(new Error(errorMessage)); // Simula um erro?
    UserServices.findByIdAndDelete.mockResolvedValue(mockEmail);
    // const req = {
      //params: { uid: '661590a33f7a3dbdf69788fa' },
  //};?
    const req = {
      params: { email: 'admin@localhost.com', password: 12345, role: 'admin' },
    };
    await deleteUser(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    // expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    expect(res.json).toHaveBeenCalledWith({ error: 'precisa do usuário' });
  });
});
