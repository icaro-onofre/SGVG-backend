import dotenv from "dotenv";
import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const vagaRouter = express.Router();

vagaRouter.get("/vaga", async (req, res) => {
  const response = await prisma.vaga.findMany();
  res.json(response);
});

vagaRouter.post("/vaga/criar", async (req, res) => {
  const { preco, setor, status, tipo, vaga_ocupada } = req.body;
  const post = await prisma.vaga.create({
    data: {
      preco,
      setor,
      status,
      tipo,
      vaga_ocupada,
    },
  });
  res.json(post);
});
export default vagaRouter;
