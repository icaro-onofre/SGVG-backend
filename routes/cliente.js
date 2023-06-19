import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const clienteRouter = express.Router();

clienteRouter.get("/cliente", async (req, res) => {
  const response = await prisma.cliente.findMany();
  res.json(response);
});

clienteRouter.post("/cliente/filter", async (req, res) => {
  const { id, email, nome, telefone, cpf } = req.body;
  const response = await prisma.cliente.findMany({
    where: {
      id: id != null ? id : undefined,
      email: email != null ? email : undefined,
      nome: nome != null ? nome : undefined,
      telefone: telefone != null ? telefone : undefined,
      cpf: cpf != null ? cpf : undefined,
    },
  });
  res.json(response);
});

//Rota para criar
clienteRouter.post("/cliente/create", async (req, res) => {
  const { email, nome, telefone, cpf } = req.body;
  let post = await prisma.cliente.create({
    data: {
      email,
      nome,
      telefone,
      cpf,
    },
  });
  res.status(201).send("Cliente criado com sucesso");
});
//Rota para atualizar
clienteRouter.post("/cliente/update", async (req, res) => {
  const { id, email, nome,cpf, telefone } = req.body;
  const post = await prisma.cliente.update({
    where: {
      id: id,
    },
    data: {
      email: email != null ? email : undefined,
      nome: nome != null ? nome : undefined,
      telefone: telefone != null ? telefone : undefined,
      cpf: cpf != null ? cpf : undefined,
    },
  });
  res.json("Cliente atualizado com sucesso" + post);
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
