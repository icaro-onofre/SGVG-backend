import dotenv from "dotenv";
import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const clienteRouter = express.Router();

clienteRouter.get("/cliente", async (req, res) => {
  const response = await prisma.cliente.findMany();
  res.json(response);
});

clienteRouter.post("/cliente/criar", async (req, res) => {
  const { email, nome, telefone } = req.body;
  const post = await prisma.cliente.create({
    data: {
      email,
      nome,
      telefone,
    },
  });
  res.json(post);
});
export default clienteRouter;
