# SGVG-backend
Api do projeto SGVG-backend

## Rodando o projeto

Lista de comandos para configurar o backend para rodar localmente 

1. npm install --> instala dependências do projeto
2. npx prisma generate --> gera o client do prisma
3. .env --> É NECESSÁRIO CRIAR UM ARQUIVO .env COM AS INFORMAÇÕES NECESSÁRIAS: COMO *SECRET* E *STRING DE CONEXÃO COM O BANCO*
4. nodemon app --> executa o arquivo app.js que contém código da api
5. Configurar acesso do IP de sua máquina no MongodbAtlas (solicitar a quem administra o MongodbAtlask.

Para executar o repositório do banco de dados localmente
é necessário clonar o banco e instalar as dependências do
projeto com *npm install*, após é necessário gerar o client
do prisma com o comando *npx primsa generate*

## Arquitetura
a arquitetura do código funciona com a abstrações de várias rotas que 
acessam os recursos no banco através do prisma.

Para cada rota existe uma query sendo executada com o prisma
