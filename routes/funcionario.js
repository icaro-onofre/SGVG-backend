import express from "express";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const funcionarioRouter = express.Router();

funcionarioRouter.get("/funcionario/", async (req, res) => {
  const response = await prisma.funcionario.findMany();
  res.json(response);
});

funcionarioRouter.post("/funcionario/filter", async (req, res) => {
  const { id, nome, telefone, email, cargo, cpf, data_nasc, root } = req.body;
  const response = await prisma.funcionario.findMany({
    where: {
      id: id != null ? id : undefined,
      cargo: cargo != null ? cargo : undefined,
      cpf: cpf != null ? cpf : undefined,
      data_nasc: data_nasc != null ? data_nasc : undefined,
      nome: nome != null ? nome : undefined,
      telefone: telefone != null ? telefone : undefined,
      email: email != null ? email : undefined,
      root: root != null ? root : undefined,
    },
  });
  res.json(response);
});

funcionarioRouter.post("/funcionario/create", async (req, res) => {
  const { nome, cargo, cpf, senha, telefone, email, data_nasc, root } =
    req.body;

  const salt = await bcrypt.genSalt(10);

  const senhaHashed = await bcrypt.hash(senha, salt);

  const post = await prisma.funcionario.create({
    data: {
      nome,
      telefone,
      email,
      cpf,
      data_nasc,
      cargo,
      root,
      senha: senhaHashed,
    },
  });
  res.json(post);
});

funcionarioRouter.post("/funcionario/update", async (req, res) => {
  const { id, nome, telefone, email, senha, cargo, cpf, data_nasc, root } =
    req.body;

  const salt = "";
  const senhaHashed = "";
  if (senha != null) {
    salt = await bcrypt.genSalt(10);
    senhaHashed = await bcrypt.hash(senha, salt);
  }

  const post = await prisma.funcionario.update({
    where: {
      id: id,
    },
    data: {
      cargo: cargo != null ? cargo : undefined,
      cpf: cpf != null ? cpf : undefined,
      data_nasc: data_nasc != null ? data_nasc : undefined,
      nome: nome != null ? nome : undefined,
      telefone: telefone != null ? telefone : undefined,
      email: email != null ? email : undefined,
      root: root != null ? root : undefined,
      senha: senha != null ? senhaHashed : undefined,
    },
  });
  res.json(post);
});

funcionarioRouter.post("/funcionario/delete", async (req, res) => {
  const { id } = req.body;
  const post = await prisma.funcionario.delete({
    where: {
      id: id,
    },
  });
  res.json(post);
});

export default funcionarioRouter;
