import express from 'express'
import cors from "cors"
import bodyParser from "body-parser"
import jwt from "jsonwebtoken";


import UsersRouter from './Routers/UsersRouter.js';
import LinksRouter from './Routers/LinksRouter.js';
import RedirectRouter from './Routers/RedirectRouter.js'
import connectDB from './database.js';



connectDB();
const app=express()
const port = 3000
const secret = "JIs%WCfS#Sl454d5FX";


app.use(cors());
app.use(bodyParser.json());
app.use('/links',LinksRouter)
app.use('/users',UsersRouter)
app.use('/',RedirectRouter)
//app.get('/',(req,res)=>{res.send('hello world!')})




app.listen(port,()=>{
    console.log(`listening on http://localhost:${port}`)
})



