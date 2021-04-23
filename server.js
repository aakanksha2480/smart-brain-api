const express=require('express');
const bcrypt=require('bcrypt-nodejs');
const cors=require('cors');

var bodyParser = require('body-parser');
const knex = require('knex');

const register=require('./controllers/register.js');
const signin=require('./controllers/signin.js');
const profile=require('./controllers/profile.js');
const image=require('./controllers/Image.js');


const db=knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'test',
      database : 'smart-brain'
    }
  });

const app=express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());

app.get('/',(req,res)=> {
    res.send("Website is working!");
})

app.post('/signin',(req,res)=> {signin.handleSignIn(req,res,db,bcrypt)});
app.post('/register', (req,res) => {register.handleregister(req,res,db,bcrypt)});
app.get('/profile/:id',(req,res)=> {profile.handleProfile(req,res,db,bcrypt)});
app.put('/image',(req,res)=> {image.handleImage(req,res,db,bcrypt)});
app.post('/imageurl',(req,res)=> {image.handleAPICall(req,res,db,bcrypt)});

app.listen(3000,()=> {  
    console.log("App is running on port 3000");
})