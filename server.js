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
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false
      }
    }
  });
 
app.get('/', (req,res) =>{res.send('it is working')})
// Post request for Checking Existing user
app.post('/signin' , (req, res) => {SignIn(db , bcrypt,req,res )} 
)
// Post Request for Registration
app.post('/register' ,  (req,res) => {Register(req,res, db  ,bcrypt)})
app.get('/profile/:id' , (req,res) => {Profile(req,res,db)})
app.put('/image' , (req,res) =>{Image(req,res,db)})
app.post('/image',(req,res) => {APIHandler(req,res)})
app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});