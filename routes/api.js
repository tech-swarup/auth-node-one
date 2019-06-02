const express = require('express')
const router = express.Router()
const umodel = require('../model/user')
const mongoose = require('mongoose')
const db = "mongodb+srv://admin:admin@cluster0-bzxvf.mongodb.net/eventsdb?retryWrites=true&w=majority"
mongoose.connect(db,function(err){
    if(err){
        console.error('Error')
    }else{
        console.log('Connect')
    }
})
router.get('/',function(req,res){
    res.send('Response comming from API route')
})

router.post('/register',function(req,res){
    // let userData = JSON.stringify(req.body)
    let userData = req.body
    console.log(userData)
    let user = new umodel(userData)
    user.save((error,rgstrUser)=>{
        if(error){
            console.log(error)
        }else{
            res.status(200).send(rgstrUser)
        }
    })
})

router.post('/login',function(req,res){
    let userData = req.body
    umodel.findOne({email: userData.email},(error,usr) => {
        if(error){
            console.log(error)
        }else{
            if(!usr){
                res.status(401).send('Invalid Email')
            }else{
                if(usr.password != userData.password){
                    res.status(401).send('Invalid Password')
                }else{
                    res.status(200).send(usr)
                }
            }
        }
    })
})
module.exports=router