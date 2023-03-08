import dotenv from 'dotenv'
import express from 'express';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const app = express()

const port = process.env.PORT || 3000

dotenv.config()

app.use(express.json())

const PORT = 3000;

app.listen(PORT,()=>console.log("Servidor rodando na porta "+PORT))

app.get('/',(req,res) => {
		res.send('Hello world');
})

app.get('/vagas', async (req,res) => {
		const response = await prisma.vaga.findMany()
		res.json(response)
})
app.get('/funcionario', async (req,res) => {
		const response = await prisma.funcionario.findMany()
		res.json(response)
})

app.get('/cliente', async (req,res) => {
		const response = await prisma.cliente.findMany()
		res.json(response)
})
