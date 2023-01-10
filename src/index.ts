import express, { Request, Response } from 'express'
import cors from 'cors'
import { accounts } from './database'
import { ACCOUNT_TYPE } from './types'

const app = express()

app.use(express.json())
app.use(cors())

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})

app.get("/ping", (req: Request, res: Response) => {
    res.send("Pong!")
})

app.get("/accounts", (req: Request, res: Response) => {
    res.send(accounts)
})
app.get("/accounts/:id", (req: Request, res: Response)=>{
const id = req.params.id
//filter sempre retorna um array
//find retorna o item ou undefined

const result = accounts.find((account)=>account.id ===id)
res.status(200).send(result)
})

app.delete("/accounts/:id", (req: Request, res: Response)=>{
    const id = req.params.id
  //só deletar caso o índice seja válido ou encontrado
    const indexToRemove= accounts.findIndex((account)=>account.id ===id)
    if(indexToRemove >= 0){
        //Splice para editar diretamente o array accounts
        //Primeiro argumento é o índice alvo
        //Segundo argumento é quantos itens serão removidos a partir do alvo
        accounts.splice(indexToRemove, 1)
    }
    res.status(200).send( "item deletado com sucesso")
    })

    //findIndex retorna 0 indice
    //splice define quantos itens serão removidos



    app.put("/accounts/:id", (req: Request, res: Response)=>{
        const id = req.params.id
        const newId = req.body.id as string | undefined
        const newOwnerName = req.body.OwnerName as string | undefined
        const newBalance = req.body.balance as number | undefined
        const newType = req.body.type as ACCOUNT_TYPE  | undefined


        const resultToEdit = accounts.find((account)=> account.id ===id)
        if(resultToEdit){
            //Pode ser feita com o ternário
            // resultToEdit.id =(newId === undefined? resultToEdit.id: newId)
resultToEdit.id=newId || resultToEdit.id
resultToEdit. ownerName= newOwnerName|| resultToEdit.ownerName
resultToEdit.type=newType || resultToEdit.type

resultToEdit.balance = isNaN(newBalance) ? resultToEdit.balance : newBalance
        }
        res.status(200).send("Atualização realizada com sucesso")

    })