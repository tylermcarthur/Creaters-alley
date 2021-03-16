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
// get all
app.get('/api/public/opening_page', async(req,res)=>{
    try {
        const scenarios = pool.query("SELECT scenario_name FROM scenarios", (err, data) => {
            let arr1 = data.rows
            let arr2 = []
            arr1.forEach(element => {
                arr2.push(Object.values(element)[0])
            });
            res.json(arr2);
        })
    } catch (err) {
        console.error(err.message)
    }
})
// get specific
app.get('/api/public/:id', async(req,res)=>{
    try {
        const name = req.params.id
        res.end(name)
        const x = pool.query(`SELECT opening_text FROM scenarios WHERE scenario_name = ${name}`,(err,data)=>{
            res.json(data.rows)
        })
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
