require('dotenv').config()
const express = require('express')
const pool = require('./Database/db_configuration.js');
const port = process.env.PORT

// our server container
const app = express();

// middleware 
app.use(express.json()) // lets us read incoming req.body data as json
app.use(express.static('public'));

// create 
app.post('/api/public', async (req,res)=>{
    try {
        res.end('boop')
    } catch (err) {
        console.error(err.message)
    }
});
app.get('/api/public/opening_page', async(req,res)=>{
    try {
        const client = await pool.connect
        const students = pool.query("SELECT opening_text FROM scenarios WHERE scenario_ID = 1", (err, data) => {
            res.json(data.rows);
            client.release();
        })
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
