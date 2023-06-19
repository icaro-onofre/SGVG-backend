import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const vagaRouter = express.Router();

vagaRouter.get("/vaga", async (req, res) => {
  const response = await prisma.vaga.findMany();
  res.json(response);
});

vagaRouter.post("/vaga/filter", async (req, res) => {
  const { id, nome, preco, setor, tipo, status } = req.body;
  const response = await prisma.vaga.findMany({
    where: {
      id: id != null ? id : undefined,
      nome: nome != null ? nome : undefined,
      preco: preco != null ? preco : undefined,
      setor: setor != null ? setor : undefined,
      tipo: tipo != null ? tipo : undefined,
    },
  });
  res.json(response);
});

vagaRouter.post("/vaga/create", async (req, res) => {
  const { nome, preco, setor, tipo, status } = req.body;

  const exists = await prisma.vaga.findMany({ where: { nome: nome } });

  if (exists != 0) {
    res.json("Esta vaga já existe");
  } else {
    const post = await prisma.vaga.create({
      data: {
        nome,
        preco,
        setor,
        tipo,
        status,
      },
    });
    res.json(post);
  }
});

vagaRouter.post("/vaga/update", async (req, res) => {
  const { id, nome, preco, setor, tipo, status } = req.body;
  const post = await prisma.vaga.update({
    where: {
      id: id,
    },
    data: {
      nome: nome != null ? nome : undefined,
      preco: preco != null ? preco : undefined,
      setor: setor != null ? setor : undefined,
      tipo: tipo != null ? tipo : undefined,
      status: status != null ? status : undefined,
    },
  });
  res.json(post);
});

vagaRouter.post("/vaga/delete", async (req, res) => {
  const { id } = req.body;
  const post = await prisma.vaga.delete({
    where: {
      id: id,
    },
  });
  res.json(post);
});

export default vagaRouter;
