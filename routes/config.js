import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const configRouter = express.Router();

configRouter.get("/config", async (req, res) => {
  const response = await prisma.config.findMany();
  res.json(response);
});

configRouter.post("/config/create", async (req, res) => {
  const { valorHora, primeiraHora, diaria } = req.body;
  let post = await prisma.config.create({
    data: {
      valorHora: valorHora != null ? valorHora : undefined,
      primeiraHora: primeiraHora != null ? primeiraHora : undefined,
      diaria: diaria != null ? diaria : undefined,
    },
  });
  res.status(201).send("Configurações criadas com sucesso");
});
//Rota para atualizar
configRouter.post("/config/update", async (req, res) => {
  const { valorHora, primeiraHora, diaria } = req.body;
  const post = await prisma.config.update({
    data: {
      valorHora: valorHora != null ? valorHora : undefined,
      primeiraHora: primeiraHora != null ? primeiraHora : undefined,
      diaria: diaria != null ? diaria : undefined,
    },
  });
  res.json("Configurações atualizadas com sucesso" + post);
});

export default configRouter;
