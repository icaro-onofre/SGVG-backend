import dotenv from 'dotenv'
import express from 'express';
const app = express()
const port = process.env.PORT || 3000

dotenv.config()

app.use(express.json())

const PORT = 3000;

app.listen(PORT,()=>console.log("Servidor rodando na porta"+PORT))

app.get('/',(req,res) => {
		res.send('Hello world');
})
