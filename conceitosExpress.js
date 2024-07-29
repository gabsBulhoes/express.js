// Importa o express
import express from "express"
const PORT = 3333;

const app = express()

//parte 01 - Roteamento - GET, POST, PUT/PATCH, DELETE
// parte 02 - Roteamento - Receber informações
/** Formas
 * 1 - QUERY PARAMS -> GET -> /users?nome=Gabriela&cargo=estudante
 * 2 - ROUTE PARAMS -> GET, PATCH, DELTE -> /users/1
 * 3 - BODY PARAMS -> POST -> /users = {JSON}
 */
// Responsável por receber JSON
app.use(express.json())
app.use(express.urlencoded({extended:true}))

// 1 - QUERY PARAMS /users?nome=gabriela&cargo=estudante
app.get('/users', (request, response)=>{
   const {nome, cargo, idade} = request.query

    response.status(200).json({nome, cargo, idade})
})

app.post('/users/:id', (request, response)=>{
    const {nome, cargo, idade} = request.query
 
    response.status(200).json({nome, cargo, idade})
})
app.put('/users/:id/:idade', (request, response)=>{
    const {id} = request.params
    response.status(200).json({"user": id, "idade": idade})
})

app.delete('/users', (request, response)=>{
    response.status(201).json
    (['Usuário 01',
    'Usuário 02',
    'Usuário 03',
    ])
})

app.listen(PORT, ()=>{
    console.log("Servidor on PORT "+PORT)
})