var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")

const app= express()
app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended: true
}))

mongoose.connect('mongodb://127.0.0.1:27017/Expense')
var db = mongoose.connection
db.on('error', ()=> console.log("Error while connecting to  Database"))
db.once('open', () => console.log("Successfully Connected to Database"))

app.post("/add", (req,res) =>{
    var category_select = req.body.category_select
    var amount_input= req.body.amount_input
    var info = req.body.info
    var date_input = req.body.date_input

    var data={
        "Category": category_select,
        "Amount" : amount_input,
        "Info": info,
        "Date": date_input
    }
    db.collection('users').insertOne(data, (err,collection) => {
        if(err){
            throw err;
        }
        console.log("Data fetched Successfully")

    })
})
app.get("/",(req,res) =>{
    res.set({
        "Allow-access-Allow-Origin":'*'
    })
    return res.redirect('index.html')
})
 const port=3000;
 app.listen(port,(req,res)=>{
    console.log(`Happy coding :) Server Connected at --> ${port}`);
 })