const express=require('express');
const app=express();
const port=8383;
const Results=require('./resultSchema');
const path=require('path')

const mongoose=require('mongoose');

app.use(express.json());
app.use(express.static(path.join(__dirname,"frontend")));

app.listen(port);

mongoose.connect('mongodb://localhost/pro',
{
useNewUrlParser:true,
useUnifiedTopology:true
});


app.use(function(req, res, next) 
{
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET, POST ,OPTIONS ,DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    if ('OPTIONS' == req.method) {
       res.sendStatus(200);
     }
     else {
       next();
}});

app.get('/',(req,res)=>
{
    res.sendFile(path.join(__dirname,"frontend","calculator.html"));
})


app.get('/getresults',async (req,res)=>
{   
    let k=await Results.find({}).sort({_id:-1});
    res.status(200).send(k);
})

app.post('/',async (req,res)=>
{
    const {elements}=req.body;
    let u;
    await Results.deleteMany({expression:{$exists:true}})

    Array.from(elements).forEach(async (item)=>
    {
        u=await Results.create({expression:item.expression,result:item.result});
    })

    res.status(200).send("sucessfully added to our database");
})


app.get('*',(req,res)=>{
    res.redirect('/');
})
