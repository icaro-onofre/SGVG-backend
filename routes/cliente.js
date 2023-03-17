import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const clienteRouter = express.Router();

clienteRouter.get("/cliente", async (req, res) => {
  const response = await prisma.cliente.findMany();
  res.json(response);
});

clienteRouter.post("/cliente/filter", async (req, res) => {
  const { email, nome, telefone } = req.body;
  const response = await prisma.cliente.findMany({
    where: {
      email: email != null ? email : undefined,
      nome: nome != null ? nome : undefined,
      telefone: telefone != null ? telefone : undefined,
    },
  });
  res.json(response);
});

//Rota para criar
clienteRouter.post("/cliente/create", async (req, res) => {
  const { email, nome, telefone } = req.body;
  const post = await prisma.cliente.create({
    data: {
      email,
      nome,
      telefone,
    },
  });
  res.json(post);
});
//Rota para atualizar
clienteRouter.post("/cliente/update", async (req, res) => {
  const { id_cliente, email, nome, telefone } = req.body;
  const post = await prisma.cliente.update({
    where: {
      id: id_cliente,
    },
    data: {
      email: email != null ? email : undefined,
      nome: nome != null ? nome : undefined,
      telefone: telefone != null ? telefone : undefined,
    },
  });
  res.json(post);
});
// Rota para apagar
clienteRouter.delete("/cliente/delete", async (req, res) => {
  const { id_cliente, email, nome, telefone } = req.body;
  const post = await prisma.cliente.delete({
    where: {
      id: id_cliente,
    },
  });
  res.json(post);
});

export default clienteRouter;
