import express from 'express'
import morgan from 'morgan'
import router from './V1/routes'
import { PrismaClient } from './generated/client'

const prisma = new PrismaClient()
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan("dev"))
app.set("prisma", prisma)
app.use("/api/v1", router)

const startServer = async (port: number = 3000) => {
    return app.listen(port, () => {
        console.info(`Server running on: http://localhost:${port}`)
    })
}

export = startServer
