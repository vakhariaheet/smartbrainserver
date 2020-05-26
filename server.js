import express from 'express'
import cors from 'cors';
import knex from 'knex'
import bcrypt from 'bcrypt-nodejs';
import Register from './controllers/Register/Register.js'
import SignIn from './controllers/SignIn.js'
import {Image} from './controllers/Image.js'
import {APIHandler} from  './controllers/Image.js'
import Profile from './controllers/Profile.js'

const app = express();
app.use(cors());
app.use(express.json());

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'aquisition',
      password : '',
      database : 'brain-api'
    }
  });

app.get('/', (req,res) =>{
    res.json(db.users);
})
// Post request for Checking Existing user
app.post('/signin' , (req, res) => {SignIn(db , bcrypt,req,res )} 
)
// Post Request for Registration
app.post('/register' ,  (req,res) => {Register(req,res, db  ,bcrypt)})
app.get('/profile/:id' , (req,res) => {Profile(req,res,db)})
app.put('/image' , (req,res) =>{Image(req,res,db)})
app.post('/image',(req,res) => {APIHandler(req,res)})
app.listen(3000 , () => {
    console.log('The Server has been started at port 3000')
})