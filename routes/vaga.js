import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const vagaRouter = express.Router();

vagaRouter.get("/vaga", async (req, res) => {
  const response = await prisma.vaga.findMany();
  res.json(response);
});

vagaRouter.post("/vaga/filter", async (req, res) => {
  const { id, preco, setor, tipo, vaga_ocupada, dataLocacao, dataLocacaoFim } =
    req.body;
  const response = await prisma.vaga.findMany({
    where: {
      id: id != null ? id : undefined,
      preco: preco != null ? preco : undefined,
      setor: setor != null ? setor : undefined,
      tipo: tipo != null ? tipo : undefined,
      vaga_ocupada: vaga_ocupada != null ? vaga_ocupada : undefined,
      dataLocacao: dataLocacao != null ? dataLocacao : undefined,
      dataLocacaoFim: dataLocacaoFim != null ? dataLocacaoFim : undefined,
    },
  });
  res.json(response);
});

vagaRouter.post("/vaga/create", async (req, res) => {
  const {
    nome,
    preco,
    setor,
    tipo,
    vaga_ocupada,
    dataLocacao,
    dataLocacaoFim,
    clienteId,
  } = req.body;

  const post = await prisma.vaga.create({
    data: {
      nome,
      preco,
      setor,
      tipo,
      vaga_ocupada,
      dataLocacao,
      dataLocacaoFim,
      clienteId: clienteId != null ? clienteId : undefined,
    },
  });
  res.json(post);
});

vagaRouter.post("/vaga/update", async (req, res) => {
  const {
    id,
    nome,
    preco,
    setor,
    tipo,
    vaga_ocupada,
    dataLocacao,
    dataLocacaoFim,
  } = req.body;
  const post = await prisma.vaga.update({
    where: {
      id: id,
    },
    data: {
      nome: nome != null ? nome : undefined,
      preco: preco != null ? preco : undefined,
      setor: setor != null ? setor : undefined,
      tipo: tipo != null ? tipo : undefined,
      vaga_ocupada: vaga_ocupada != null ? vaga_ocupada : undefined,
      dataLocacao: dataLocacao != null ? dataLocacao : undefined,
      dataLocacaoFim: dataLocacaoFim != null ? dataLocacaoFim : undefined,
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
