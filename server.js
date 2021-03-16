require('dotenv').config()
const express = require('express')
const pool = require('./Database/db_configuration.js');
const port = process.env.PORT

// our server container
const app = express();

// middleware 
app.use(express.json()) // lets us read incoming req.body data as json
//app.use(express.static('public'));

// create 
app.post('/api/public', async (req,res)=>{
    try {
    } catch (err) {
        console.error(err.message)
    }
});
//read one
app.get('/',(req,res)=>{
    res.end('boop')
    }
)
app.get('/api/public/', async(req,res)=>{
    try {
    } catch (err) {
        console.error(err.message)
    }
})
//read all
app.get('/api/public', async(req,res)=>{
    try {
    } catch (err) {
        console.error(err.message)
    }
})
//update
app.patch('/api/public/', async (req,res)=>{
    try {

    } catch (err) {
        console.error(err.message)
    }
})
//delete
app.delete('/api/public/', async(req,res)=>{
  try {
  } catch (err) {
      console.error(err.message)
  }
})

// causes our server to listen for incoming reuqests to this port
app.listen(port, ()=>{
    console.log(`LISTINING ON PORT ${port}`)
});