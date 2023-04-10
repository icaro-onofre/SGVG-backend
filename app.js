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

app.get("/", (req, res) => {
  res.send("Servidor rodando");
});

app.post("/signin", cors(corsOptions),authenticateToken, async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  const { nome, senha } = req.body;

  try {
    const response = await prisma.funcionario.findMany({
      where: {
        nome: nome,
      },
    });

    bcrypt.compare(senha, response[0].senha, (err, result) => {
      jwt.sign(response[0].id, process.env.SECRET, (err, token) => {
        if (result) {
          res.status(200);
          res.send(token);
        } else {
          res.status(500).json({ mensagem: "Erro ao gerar o JWT" });
          res.end();
        }
      });
    });

  } catch (error) {
    console.log(error+"Não foi possível criar o token");
  }
});
