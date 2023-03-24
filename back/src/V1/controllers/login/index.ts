import jwt from "jsonwebtoken";
import { Request, Response } from "express"
import { PrismaClient } from "../../../generated/client"
import { compare } from 'bcrypt'

export const login = async (req: Request, res: Response) => {
    try {
        const prisma: PrismaClient = req.app.get("prisma")
        const { correo, password } = req.body
        const user = await prisma.usuario.findUnique({
            where: {
                correo,
            }
        })

        if (!user) {
            return res.status(404).send({ message: "Not Found" })
        }

        const validatePassword = await compare(password, user.password)
        if (!validatePassword) {
            return res.status(404).send({ message: "Not Found" })
        }

        const token = jwt.sign(user, "shdf90934v834924nv3r -as.d89h37d1,3-123kd72y7678$%&/()%E$$/(/&%&/(/$%&/(/&%&/(/&")

        return res.status(200).send(token)
    } catch (error) {
        return res.status(500).send(error)
    }
}
