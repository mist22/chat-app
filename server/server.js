import dotenv from "dotenv"
dotenv.config();

import express, { json } from "express"
import {Pool} from "pg"
import { Resend } from "resend";
import cors from "cors"

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
})



pool.connect((error, release, client) => {
    if (error){
        return console.error("connecttion failed to neon postgress Sql", error.message)
    }
    console.log('✅ Successfully connected to Neon PostgreSQL!')

})

let app = express()

app.use(cors({
    origin: "http://localhost:5173"
}))

app.use(express.json());

let PORT = process.env.Port
let resend = new Resend(process.env.RESEN_API_KEY)

app.get('/', (req, res) => {
    return res.status(200).json({message: "hellow wordl"})
})

app.post('/send_invite', async (req, res) => {
    console.log(10)
    const {emailka} = req.body
    const result = await resend.emails.send({
        from: "chat dev <onboarding@resend.dev>",
        to: emailka,
        subject: "you have been invited",
        html: "<h1> ku soo biir chat app ka! </h1>"
    })

    if (result.error){
        return res.status(403).json({error: result.error})
    }

    return res.status(200).json({messgae: "email sent succefuly"})

})

app.listen(PORT , () => {
    console.log("server runnning at port", PORT)
})