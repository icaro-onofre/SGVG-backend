import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const veiculoRouter = express.Router();

veiculoRouter.get("/veiculo", async (req, res) => {
  const response = await prisma.veiculo.findMany();
  res.json(response);
});

veiculoRouter.post("/veiculo/filter", async (req, res) => {
  const { id_veiculo, categoria, cor, modelo } = req.body;
  const response = await prisma.veiculo.findMany({
    where: {
      id: id_veiculo,
      categoria: categoria != null ? categoria : undefined,
      cor: cor != null ? cor : undefined,
      modelo: modelo != null ? modelo : undefined,
    },
  });
  res.json(response);
});

veiculoRouter.post("/veiculo/create", async (req, res) => {
  const { categoria, cor, modelo } = req.body;
  const post = await prisma.veiculo.create({
    data: {
      categoria,
      cor,
      modelo,
    },
  });
  res.json(post);
});

veiculoRouter.post("/veiculo/update", async (req, res) => {
  const { id_veiculo, categoria, cor, modelo } = req.body;
  const post = await prisma.veiculo.update({
    where: {
      id: id_veiculo,
    },
    data: {
      categoria: categoria != null ? categoria : undefined,
      cor: cor != null ? cor : undefined,
      modelo: modelo != null ? modelo : undefined,
    },
  });
  res.json(post);
});

veiculoRouter.delete("/veiculo/delete", async (req, res) => {
  const { id_veiculo } = req.body;
  const post = await prisma.veiculo.delete({
    where: {
      id: id_veiculo,
    },
  });
  res.json(post);
});

export default veiculoRouter;
