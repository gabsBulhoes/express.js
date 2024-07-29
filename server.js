import express from "express"
import { v4 as uuidv4 } from 'uuid';

const PORT = 3333;
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

const logRoutes = (request, response, next) =>{
    const { url, method } = request
        const rota = `[${method.toUpperCase()}] ${url}`
        console.log(rota)
        next()
}
app.use(logRoutes)

const usuarios = []
app.get('/usuarios', (request, response)=>{
  response.status(200).json(usuarios);
});

app.post("/usuarios", ( request, response)=>{
    const {nome, cargo} = request.body
    //validações
    if(!nome){
        response.status(400).json({message:"O nome é obrigatório"})
        return
    }
    if(!cargo){
        response.status(400).json({message:"O cargo é obrigatório"})
        return
    }
    const novoUsuario = {
        id: uuidv4(),
        nome, 
        cargo
    }
    usuarios.push(novoUsuario)
    response.status(201).json({message:"usuário não encontrado", novoUsuario});
});

app.patch("/usuarios/:id", (request, response)=>{
    const { id } = request.params
    const {nome, cargo} = request.body

    const indexUsuario = usuarios.find(usuario => usuario.id === id)

    if(indexUsuario === -1){
        response.status(404).json({message: "Usuário não encontrado"})
        return
        }

    //validações
    if(!nome){
        response.status(400).json({message:"O nome é obrigatório"})
        return
    }
    if(!cargo){
        response.status(400).json({message:"O cargo é obrigatório"})
        return
    }

    const updateUsuario = {
        id,
        nome,
        cargo
    } 

    usuarios[indexUsuario] = updateUsuario
    response.status(200).json({message:"Usuario atualizado", updateUsuario}) 
})

app.delete("/usuarios/:id", (request, response)=>{
    const id = request.params.id

    const indexUsuario = usuarios.find(usuario => usuario.id === id)

    if(indexUsuario === -1){
    response.status(404).json({message: "Usuário não encontrado"})
    return
    }

    usuarios.splice(indexUsuario, 1)
    response.status(200).json({message:"Usuário deletado"})
})

app.listen(PORT, ()=>{
    console.log("Servidor on PORT: ",+PORT);
})