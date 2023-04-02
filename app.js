import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import express from "express";
import bcrypt from "bcrypt";
import bodyparser from "body-parser";
import jwt from "jsonwebtoken";
import { hashPass, generateAccessToken } from "./utils/auth.js";

import clienteRouter from "./routes/cliente.js";
import vagaRouter from "./routes/vaga.js";
import veiculoRouter from "./routes/veiculo.js";
import funcionarioRouter from "./routes/funcionario.js";

dotenv.config();

const prisma = new PrismaClient();

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

const PORT = 3000;

app.listen(PORT, () => console.log("Servidor rodando na porta " + PORT));

app.use(clienteRouter);
app.use(funcionarioRouter);
app.use(vagaRouter);
app.use(veiculoRouter);

app.get("/", (req, res) => {
  res.send("Servidor rodando");
});

app.post("/signup", async (req, res) => {
  const { nome, senha } = req.body;

  const response = await prisma.funcionario.findMany({
    where: {
      nome: nome,
      senha: senha,
    },
  });

  bcrypt.compare(senha, response.senha, (err, result) => {
    jwt.sign({ nome: nome }, process.env.SECRET, (err, token) => {
      if (!err) {
        res.status(200);
        res.send(token);
      } else {
        res.status(500).json({ mensagem: "Erro ao gerar o JWT" });
        res.end();
      }
    });
  });
});

app.get("/signin", (req, res) => {});
