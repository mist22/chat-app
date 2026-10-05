import dotenv from "dotenv"
dotenv.config();

import express, { json } from "express"
import {Pool} from "pg"
import { Resend } from "resend";
import cors from "cors"
import bcrypt from "bcrypt"

let app = express()

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ["Content-Type", "Authorization"]
}))

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
app.post("/signup", async(req, res) => {
    const {name, number, email, password} = req.body
    console.log(name, number, email, password)
    const client = await pool.connect()
    const salt = 12
    const password_hash = await bcrypt.hash(password, salt)
    try{
        const check = await client.query("SELECT *FROM users  WHERE number =$1",[number])
        if(check.rows.length > 0){
            return res.status(403).json({message: "user already exist"})
        }

        const result = await client.query(`
            INSERT INTO users (username, email , password_hash, number) VALUES ($1, $2, $3)
            RETURNING *`,[name, email,  password_hash, number])
        await client.query("COMMIT")
        if (result.rows.length > 0) {
            return res.status(200).json({data: result.rows[0], message: "succesfully signed up"})
        }
    }catch(err){
        await client.query("ROLLBACK")
        return res.status(403).json({error: "Signup not succefully"})
    }finally{
        client.release()
    }
})
app.listen(PORT , () => {
    console.log("server runnning at port", PORT)
})