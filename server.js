const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors')
const PORT = process.env.PORT || 3000
const api =require('./routes/api')
const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use('/api',api)
app.get('/',function(req,res){
    res.send('Hello from Server')
    // res.sendFile('index.html',{root:path.join(__dirname,'./files')})
})
app.listen(PORT,function(){
    console.log('Server '+PORT)
})