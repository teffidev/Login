import { Request, Response } from "express"
import { PrismaClient } from "../../../generated/client"
import {hash} from 'bcrypt'

export const signUpController = async (req: Request, res: Response) => {
    try {
        const {nombre, correo, password} = req.body
        const prisma: PrismaClient = req.app.get("prisma")
        const user = await prisma.usuario.create({
            data: {
                nombre,
                correo,
                password: await hash(password, 10)
            }
        })
        return res.status(200).send({...user})
    } catch (error) {
        return res.status(500).send({message: error})
    }
}