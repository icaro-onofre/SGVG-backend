import dotenv from 'dotenv'
import express from 'express';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const app = express()

app.get('/vaga', async (req,res) => {
		const response = await prisma.vaga.findMany()
		res.json(response)
})
