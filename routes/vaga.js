import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const vagaRouter = express.Router();

vagaRouter.get("/vaga", async (req, res) => {
  const response = await prisma.vaga.findMany();
  res.json(response);
});

vagaRouter.post("/vaga/filter", async (req, res) => {
  const { preco, setor, status, tipo, vaga_ocupada } = req.body;
  const response = await prisma.vaga.findMany({
	  wher:{
		  preco:preco!=null?preco:undefined,
      setor:setor!=null?setor:undefined,
      status:status!=null?status:undefined,
      tipo:tipo!=null?tipo:undefined,
      vaga_ocupada:vaga_ocupada!=null?vaga_ocupada:undefined,
	  }
  });
  res.json(response);
});

vagaRouter.post("/vaga/create", async (req, res) => {
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

vagaRouter.post("/vaga/update", async (req, res) => {
  const { preco, setor, status, tipo, vaga_ocupada } = req.body;
  const post = await prisma.vaga.update({
    where: {
      id: id_vaga,
    },
    data: {
      preco: preco != null ? preco : undefined,
      setor: setor != null ? setor : undefined,
      status: status != null ? status : undefined,
      tipo: tipo != null ? tipo : undefined,
      vaga_ocupada: vaga_ocupada != null ? vaga_ocupada : undefined,
    },
  });
  res.json(post);
});

vagaRouter.delete("/vaga/delete", async (req, res) => {
  const { preco, setor, status, tipo, vaga_ocupada } = req.body;
  const post = await prisma.vaga.delete({
    where: {
      id: id_vaga,
    },
  });
  res.json(post);
});

export default vagaRouter;
