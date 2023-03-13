import dotenv from 'dotenv'
import express from 'express';
import { PrismaClient } from '@prisma/client'

const clienteRouter = express.Router();

const prisma = new PrismaClient()

const app = express()

clienteRouter.get('/cliente', async (req,res) => {
		const response = await prisma.cliente.findMany()
		res.json(response)
})

export default clienteRouter;
