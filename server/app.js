import { getMyIndexes, submitOracleResponse, registerOracles, fetchFlightStatus } from './ethereum/web3.js'
import  express from 'express'
import bodyParser from 'body-parser'
const app = express()
const port = 3001

// create application/json parser
const jsonParser = bodyParser.json()

registerOracles()

app.get('/index',async (req, res) => {
    try {
        res.send(await getMyIndexes(req.query.address))
        res.send(200)
    } catch (error) {
        console.log(error)
        res.send(404)
    }
})

app.post('/request',jsonParser, async (req, res)=> {
    try{
        const respond = await fetchFlightStatus(req.body)
        const {index, airline, flight, timestamp} = respond.events.OracleRequest.returnValues
        res.send({
            index, airline, flight, timestamp
        })
    }catch(error){
        console.log(error)
        res.send(404)
    }
})

app.post('/submit',jsonParser,  async (req, res) => {
    try {
       await submitOracleResponse(req.body)
       res.send(200)
    } catch (error) {
        console.log(error)
        res.send(404)
    }
})


app.listen(
    port, () => {
        console.log(`Example app listening at http://localhost:${port}`)
    }
)