import express from 'express'
import bcrypt from 'bcrypt'
import calculateAge from '../utils/calculateAge'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const funcionarioRouter = express.Router()

funcionarioRouter.get('/funcionario', async (req, res) => {
	const response = await prisma.funcionario.findMany()
	res.json(response)
})

funcionarioRouter.post('/funcionario/filter', async (req, res) => {
	const { nome, cargo, cpf, idade, data_nasc, root } = req.body
	const response = await prisma.funcionario.findMany({
		where: {
			cargo: cargo != null ? cargo : undefined,
			cpf: cpf != null ? cpf : undefined,
			data_nasc: data_nasc != null ? data_nasc : undefined,
			idade: idade != null ? idade : undefined,
			nome: nome != null ? nome : undefined,
			root: root != null ? root : undefined,
		},
	})
	res.json(response)
})

funcionarioRouter.post('/funcionario/create', async (req, res) => {
	const { nome, cargo, cpf, senha, data_nasc, root } = req.body
  const idade = calculateAge(data_nasc)
	const salt = await bcrypt.genSalt(10)
	const senhaHashed = await bcrypt.hash(senha, salt)

	const post = await prisma.funcionario.create({
		data: {
			nome,
			cpf,
			data_nasc,
			idade,
			cargo,
			root,
			senha: senhaHashed,
		},
	})
	res.json(post)
})

funcionarioRouter.post('/funcionario/update', async (req, res) => {
	const { id_funcionario, nome } = req.body
	const post = await prisma.funcionario.update({
		where: {
			id: id_funcionario,
			nome: nome,
		},
		data: {
			cargo: cargo != null ? cargo : undefined,
			cpf: cpf != null ? cpf : undefined,
			data_nasc: data_nasc != null ? data_nasc : undefined,
			idade: idade != null ? idade : undefined,
			nome: nome != null ? nome : undefined,
			root: root != null ? root : undefined,
			senha: senha != null ? senha : undefined,
		},
	})
	res.json(post)
})

funcionarioRouter.delete('/funcionario/delete', async (req, res) => {
	const { id_funcionario } = req.body
	const post = await prisma.funcionario.delete({
		where: {
			id: id_funcionario,
		},
	})
	res.json(post)
})

export default funcionarioRouter
