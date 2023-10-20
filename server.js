import express from 'express'
import mongoose from 'mongoose'
import Cors from 'cors'
import dbCards from './dbCards.js'
import { config } from 'dotenv';


//App Config
config();
const app = express()
const port = process.env.PORT || 8001

const connection_url = process.env.CONNECTION_URL

//Middleware
app.use(express.json())
app.use(Cors())

//DB Config
mongoose.connect(connection_url, {
    serverApi: {
        version: "1",
        strict: true,
        deprecationErrors: true,
    }
})

//API Endpoints
app.get('/',(req, res) => res.status(200).send("Hello TheWebDev"))

app.post('/dating/cards', async (req, res) => {
    try{
        const dbCard = req.body
        const data = await dbCards.create(dbCard);
        res.status(200).send(data)
    }
    catch(err) {
        res.status(500).send(err)
    }
})

app.get('/dating/cards', async (req, res) => {
    try{
        const data = await dbCards.find({ });
        res.status(200).send(data)
    }
    catch(err) {
        res.status(500).send(err)
    }
})

//Listener
app.listen(port, () => console.log(`Listening... do not disturb`))

