import dotenv from "dotenv";
import express from "express";
import clienteRouter from "./routes/cliente.js";
import funcionarioRouter from "./routes/funcionario.js";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const app = express();

const port = process.env.PORT || 3000;

dotenv.config();

app.use(express.json());

const PORT = 3000;

app.listen(PORT, () => console.log("Servidor rodando na porta " + PORT));

app.use(clienteRouter);
app.use(funcionarioRouter);

app.get("/", (req, res) => {
  res.send("Servidor rodando");
});

app.get("/signup", (req, res) => {
  res.send("Rota de registro");
});

app.get("/signin", (req, res) => {
  res.send("Rota de login");
});
