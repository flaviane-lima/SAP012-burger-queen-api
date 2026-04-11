
# Burger Queen API

## 📌 Descrição

API desenvolvida como parte de um desafio do bootcamp, com foco em autenticação e gerenciamento de usuários.
Atualmente implementa apenas as rotas de users, permitindo cadastro e login com a geração de token JWT.

## 🚀 Tecnologias utilizadas

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)  
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)  
![MongoDB Atlas](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)  
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)  


## 🔑 Rotas implementadas
 - **`POST /users`** → Criação de usuário
 - **`POST /auth`** → Login e geração de token JWT  


## 🛠️ Como rodar o projeto

1. **Clone este repositório**
   ```bash
   git clone https://github.com/flaviane-lima/SAP012-burger-queen-api.git
   ```
      
2. **Instale as dependências**
   ```bash
   npm install
   ```
3. **Configure a variável de ambiente**
 
- Crie um arquivo .env na raiz do projeto

-  Adicione sua string de conexão do MongoDB Atlas:
   ```env
     MONGODB_URI=sua_string_de_conexao
   ```

4.  **Inicie o servidor**  
   ```bash
   npm start
   ```

## 🌐 Deploy
O projeto está disponível em:
https://sap-012-burger-queen-api.vercel.app

## 📌 Status do Projeto

✅ Concluído — versão inicial implementada com foco em autenticação e gerenciamento de usuários.  
Atualmente disponíveis apenas as rotas de **users** (`POST /users`, `POST /auth`).  
🔮 Futuramente, o projeto poderá ser expandido para incluir rotas de **products** e **orders**.



