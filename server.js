
const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const app = express()
const knex = require('knex')
const register = require('./controllers/register')
const signin = require('./controllers/signin')
const updateProfile = require('./controllers/updateProfile')
const updateEntries = require('./controllers/updateEntries')


const db = knex({
    client: 'pg',
    connection: {
      host: 'localhost',
      user: 'postgres',
      password: 'postgres',
      database: 'employerManager',
      
    },
  });
 



app.use(express.json());
app.use(cors());

const database = {
    users:[
        {id:'123',
        name:'user',
        email:'user@yahoo.com',
        pasword:'userpas',
        entries :0,
        join:new Date()
         }, 
         {id:'124',
         name:'john',
         email:'john@yahoo.com',
         pasword:'userpas2',
         entries :0,
         join:new Date()
          },
          {id:'1244',
         name:'john',
         email:'john@yahoo.com',
         pasword:'userpas2',
         entries :0,
         join:new Date()
          }
    ],
    login:[
        {id:'123',
        has:'',
        email:'user@yahoo.com'
    }
    ]
}

const getData = async ()=>{
    const users =  await  db.select('*').from('users')
    
    app.get('/', (req,res)=>{
        res.send(users
        );   
    })
    
}
getData();


app.post('/signin', (req,res) => {signin.handleSignIn(req,res,db,bcrypt)})

app.post('/register', (req,res) => {register.handleRegister(req,res,db,bcrypt)})

app.get("/profile/:id", (req,res) => {updateProfile.updateProfile(req,res,db)})

app.put('/image', (req,res) => {updateEntries.handleEntries(req,res,db)})


app.listen(process.env.PORT || 3000, () => {
    console.log(`app is runing on port ${process.env.PORT}`)
})



        //  db.select('*').from('users')
        // .returning()
        // .then(result => console.log(result))