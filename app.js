import authenticateToken from "./utils/auth.js";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import clienteRouter from "./routes/cliente.js";
import vagaRouter from "./routes/vaga.js";
import veiculoRouter from "./routes/veiculo.js";
import funcionarioRouter from "./routes/funcionario.js";
import ocupacaoRouter from "./routes/ocupacao.js";
import configRouter from "./routes/config.js";

dotenv.config();

const prisma = new PrismaClient();

const app = express();

app.use(express.json());

const PORT = 3001;

app.listen(PORT, () => console.log("Servidor rodando na porta " + PORT));

app.use(cors());

var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  AcessControlAllowOrigin: true,
};

app.use(clienteRouter);
app.use(funcionarioRouter);
app.use(vagaRouter);
app.use(veiculoRouter);
app.use(ocupacaoRouter);
app.use(configRouter);

app.get("/", (req, res) => {
  res.send("Servidor rodando");
});

app.post("/signin", cors(corsOptions), async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const { nome, senha } = req.body;

  console.log(nome);
  console.log(senha);
  const response = await prisma.funcionario.findMany({
    where: {
      nome: nome,
    },
  });

  bcrypt.compare(senha, response[0].senha, (err, result) => {
    jwt.sign(
      {
        id: response[0].id,
        nome: response[0].nome,
        email: response[0].email,
        root: response[0].root,
      },
      process.env.SECRET,
      (err, token) => {
        if (result) {
          res.send(token);
        } else {
          res.status(401).json({ mensagem: "Erro ao gerar o JWT" });
          res.end();
        }
      }
    );
  });
});
