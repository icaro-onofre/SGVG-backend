import express from "express";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const ocupacaoRouter = express.Router();

ocupacaoRouter.get("/ocupacao/", async (req, res) => {
  const response = await prisma.ocupacao.findMany();
  res.json(response);
});

ocupacaoRouter.post("/ocupacao/filter", async (req, res) => {
  const { id, cpf, dataLocacao, dataLocacaoFim, placa, vaga } = req.body;
  const response = await prisma.ocupacao.findMany({
    where: {
      id: id != null ? id : undefined,
      cpf: cpf != null ? cpf : undefined,
      dataLocacao: dataLocacao != null ? dataLocacao : undefined,
      dataLocacaoFim: dataLocacaoFim != null ? dataLocacaoFim : undefined,
      vaga: vaga != null ? vaga : undefined,
      placa: placa != null ? placa : undefined,
    },
  });
  res.json(response);
});

ocupacaoRouter.post("/ocupacao/create", async (req, res) => {
  const { cpf, dataLocacao, dataLocacaoFim, placa, vaga } = req.body;

  const salt = await bcrypt.genSalt(10);

  const senhaHashed = await bcrypt.hash(senha, salt);

  const post = await prisma.ocupacao.create({
    data: {
      cpf,
      dataLocacao,
      dataLocacaoFim,
      placa,
      vaga,
    },
  });
  res.json(post);
});

ocupacaoRouter.post("/ocupacao/update", async (req, res) => {
  const { id, cpf, dataLocacao, dataLocacaoFim, placa, vaga } =
    req.body;
  const post = await prisma.ocupacao.update({
    where: {
      id: id,
    },
    data: {
      id: id != null ? id : undefined,
      cpf: cpf != null ? cpf : undefined,
      dataLocacao: dataLocacao != null ? dataLocacao : undefined,
      dataLocacaoFim: dataLocacaoFim != null ? dataLocacaoFim : undefined,
      vaga: vaga != null ? vaga : undefined,
      placa: placa != null ? placa : undefined,
    },
  });
  res.json(post);
});

ocupacaoRouter.post("/ocupacao/delete", async (req, res) => {
  const { id } = req.body;
  const post = await prisma.ocupacao.delete({
    where: {
      id: id,
    },
  });
  res.json(post);
});

export default ocupacaoRouter;
