import { getMyIndexes, submitOracleResponse, registerOracles } from './ethereum/web3.js'
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
    } catch (error) {
        res.send(404)
    }
})

app.post('/submit',jsonParser,  async (req, res) => {
    try {
       await submitOracleResponse(req.body)
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