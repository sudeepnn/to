const express=require('express')
const body=require('body-parser')
const mongoose=require('mongoose')
require('dotenv').config()
const app=express()
app.use(body.urlencoded({extended:true}))
app.set('view engine','ejs')
app.use(express.static('public'))
const port=process.env.PORT

mongoose.connect(process.env.MOGOURI)

const todoschema=mongoose.Schema({
    task:String
})
const todomodel=mongoose.model('tasks',todoschema)

app.get('/',(req,res)=>{
    todomodel.find().then((result) => {
        res.render('index',{tasks:result})
    }).catch((err) => {
        console.log(err)
    });

})

app.post('/',(req,res)=>{
var todotask=req.body.task
const t1=new todomodel({task:todotask})
t1.save()
res.redirect('/')
})

app.post('/delete',(req,res)=>{
    var item=req.body.checkbox
    todomodel.deleteOne({_id:item}).then((result) => {
        res.redirect('/')
    }).catch((err) => {
        console.log(err)
    });
})



app.listen(port,()=>{
    console.log(`server started on port ${port}`)
})
