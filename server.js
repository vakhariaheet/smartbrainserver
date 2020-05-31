import express from 'express'
import cors from 'cors';
import pg from 'pg'
import knex from 'knex'
import bcrypt from 'bcrypt-nodejs';
import Register from './controllers/Register/Register.js'
import SignIn from './controllers/SignIn.js'
import {Image} from './controllers/Image.js'
import {APIHandler} from  './controllers/Image.js'
import Profile from './controllers/Profile.js'
const {Pool} = pg

const app = express();
app.use(cors());
app.use(express.json());
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});
const db = knex({
    client: 'pg',
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false
      }
    }
  });
  app.get('/db', async (req, res) => {
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM test_table');
      const results = { 'results': (result) ? result.rows : null};
      res.render('pages/db', results );
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })
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