require('dotenv').config()
const express = require('express')
const pool = require('./Database/db_configuration.js');
const port = process.env.PORT

// our server container
const app = express();

// middleware 
app.use(express.json()) // lets us read incoming req.body data as json
app.use(express.static('public'));

// get all the scenarios for the starting home page
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
// get specific scenario to then choose actions from
app.get('/api/public/:id', async(req,res)=>{
    try {
        const name = req.params.id
        pool.query(`SELECT opening_text FROM scenarios WHERE scenario_name = '${name}'`,(err,data)=>{
            let text = Object.values(data.rows)
            res.json(text)
        })
    } catch (err) {
        console.error(err.message)
    }
})
//delete the scenario previously chosen
app.delete('/api/public/', async(req,res)=>{
  try {
      const name = req.body.scenario_name
      pool.query(`DELETE FROM scenarios WHERE scenario_name = '${name}'`, (err,data)=>{
          res.json('Deleted')
      })
  } catch (err) {
      console.error(err.message)
  }
})
//used to send pages back after play was selected
app.get('/api/page/:id/:num',async(req,res)=>{
    try {
        const scenario_name = req.params.id
        let text = ''
        const page_number = req.params.num
        pool.query(`SELECT page_text FROM pages WHERE page_number= ${page_number}`,(err,data)=>{
            res.json(data)
        })
    } catch (err) {
        console.error(err.message)
    }
})

// causes our server to listen for incoming reuqests to this port
app.listen(port, ()=>{
    console.log(`LISTINING ON PORT ${port}`)
});
