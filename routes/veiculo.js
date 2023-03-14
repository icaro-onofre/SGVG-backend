import dotenv from "dotenv";
import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const veiculoRouter = express.Router();

veiculoRouter.get("/veiculo", async (req, res) => {
  const response = await prisma.veiculo.findMany();
  res.json(response);
});

veiculoRouter.post("/veiculo/criar", async (req, res) => {
  const {categoria,cor,modelo} = req.body;
  const post = await prisma.veiculo.create({
    data: {
      categoria,
      cor,
      modelo,
    },
  });
  res.json(post);
});
export default veiculoRouter;
