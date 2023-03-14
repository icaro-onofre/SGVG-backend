import dotenv from "dotenv";
import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const funcionarioRouter = express.Router();

funcionarioRouter.get("/funcionario", async (req, res) => {
  const response = await prisma.funcionario.findMany();
  res.json(response);
});

funcionarioRouter.post("/funcionario/criar", async (req, res) => {
  const { nome, cargo, cpf, idade, senha, data_nasc, root } = req.body;
  const post = await prisma.funcionario.create({
    data: {
      cargo,
      cpf,
      data_nasc,
      idade,
      nome,
      root,
      senha,
    },
  });
  res.json(post);
});
export default funcionarioRouter;
