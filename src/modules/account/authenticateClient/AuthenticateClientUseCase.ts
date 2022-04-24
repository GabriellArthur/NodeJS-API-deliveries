import { prisma } from "../../../database/prismaClient";
import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'

interface IAuthenticateClient {
   username: string;
   password: string;
}

export class AuthenticateClientUseCase {
   async execute({ username, password }: IAuthenticateClient) {
      //Receber username,password

      //verificar se username cadastrado
      const client = await prisma.clients.findFirst({
         where: {
            username
         }
      })

      if (!client) {
         throw new Error("Username or password invalid!")
      }
      //verificar se senha corresponde ao username
      const passwordMatch = await compare(password, client.password)

      if (!passwordMatch) {
         throw new Error("Username or password invalid!")
      }

      //gerar o token
      const token = sign({ username }, "4d0028682d3283ad207d72bcac528d01", {
         subject: client.id,
         expiresIn: "1d"
      })

      return token
   }
}