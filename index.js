// 1.importing the express
const express=require('express')
const employeeModel = require('./model')

//2.Inintialise express
const app = new express()

//3.middleware
app.use(express.urlencoded({ extended:true }))
app.use(express.json())

//4.API creation
app.get('/',(req,res)=>{
    res.send('Message from server')
})

app.get('/trail',(req,res)=>{
    res.send("Message from trial API")
})

app.get('/data',(req,res)=>{
    res.json({"name":"Leo","age":"36"})
})
app.post('/create',(req,res)=>{
    res.json({"name":"Joseph","Age":25})
})
app.post("/postdata",(req,res)=>{
    console.log(req.body)
    res.send("data added")
})

//api to add data to db
app.post('/add',async(req,res)=>{
    const result = await new employeeModel(req.body);
        result.save();
        res.send("data added")
    })

// api to view data from employeeModel.db
app.get('/view',async(req,res)=>{
    let result = await employeeModel.find();
    res.json(result);
})

//Deleting a data
app.delete('/remove/:id',async(req,res)=>{
    console.log(req.params);
    let id = req.params.id;
    await employeeModel.findByIdAndDelete(id);   
    res.json({message:'deleted'})
})

//to updates
app.put('/edit/:id',async(req,send)=>{
    let id = req.params.id
    await employeeModel.findByIdAndUpdate(id,req.body);
    res.send("updated")
})

//5.port
app.listen(8080,()=>{
    console.log("port 8080 is up and running")
})
