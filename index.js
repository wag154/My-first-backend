// const http = require ("http");

// const server = http.createServer((req,res) =>{
//   res.end("Hello, how i wish the world for you!")
//   res.end()
// })

// server.listen(3000,()=> {console.log("Server Ready")})
require("dotenv").config()
const express = require ("express");
const fruits = require("./fruits")
const app = express();
const port = process.env.PORT;

// Routes
app.use(express.json());
app.get('/',(req,res)=>{
  res.send("Hello World");
});

const getFruit =(fruitName) =>{
  return fruits.find((fruit) => fruit.name.toLowerCase() == fruitName)
}

const getMaxId = () =>{
  const ids = fruits.map((fruit) => fruit.id)
  return Math.max(...ids)
}

app.get('/elephant' , (req,res) =>{
  res.status(404).send();
})

app.post("/fruits", (req,res) =>{
  //check  if fruit already exists
  const fruit = getFruit(req.body.name.toLowerCase())
  if (fruit != undefined){
    res.status(409).send();
  }
  else {
    let maxId = getMaxId() + 1
    req.body.id = maxId
    fruits.push(req.body)
    res.status (201).send(req.body);
  }
})

app.delete("/fruits/:name",(req,res) =>{
  
  const name = req.params.name.toLowerCase();
  
  const fruit = getFruit(name);
  const fruitIndex =fruits.indexOf(fruit)
  
  if (fruitIndex == -1){ 
    res.status(404).send();
  }
  else {
    fruits.splice(fruitIndex,1)
    res.status(204).send();
  }

})
app.get("/fruits/:name",(req,res) =>{
  
  let fruitName = req.params.name.toLocaleLowerCase();
   const fruit = getFruit(fruitName) 
  if (fruit == undefined){
    res.status(404).send();
  }
  else{
    res.send(fruit);
  }
})

app.get('/elephant/:name&:age', (req,res) =>{
  res.send(req.params);
})

app.get('/elephant/:name',(req,res) =>{
  res.send(req.query);
})

app.listen(port,()=>{
  console.log(`Server Running on port ${port}`)
})
