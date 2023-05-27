import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const veiculoRouter = express.Router();

veiculoRouter.get("/veiculo", async (req, res) => {
  const response = await prisma.veiculo.findMany();
  res.json(response);
});

veiculoRouter.post("/veiculo/filter", async (req, res) => {
  const { id, categoria, cor, modelo, placa } = req.body;
  const response = await prisma.veiculo.findMany({
    where: {
      id: id != null ? id : undefined,
      categoria: categoria != null ? categoria : undefined,
      cor: cor != null ? cor : undefined,
      modelo: modelo != null ? modelo : undefined,
      placa: placa != null ? placa : undefined,
    },
  });
  res.json(response);
});

veiculoRouter.post("/veiculo/create", async (req, res) => {
  const { categoria, cor, modelo, placa, clienteId } = req.body;
  const post = await prisma.veiculo.create({
    data: {
      categoria,
      cor,
      modelo,
      placa,
      clienteId,
    },
  });
});

veiculoRouter.post("/veiculo/update", async (req, res) => {
  const { id, categoria, cor, modelo, placa, clienteId } = req.body;

  const post = await prisma.veiculo.update({
    where: {
      id: id,
    },
    data: {
      placa: placa != null ? placa : undefined,
      categoria: categoria != null ? categoria : undefined,
      cor: cor != null ? cor : undefined,
      modelo: modelo != null ? modelo : undefined,
      clienteId: clienteId != null ? clienteId : undefined,
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
