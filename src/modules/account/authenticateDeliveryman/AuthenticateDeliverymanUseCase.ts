import { prisma } from "../../../database/prismaClient";
import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'

interface IAuthenticateDeliveryman {
   username: string;
   password: string;
}

export class AuthenticateDeliverymanUseCase {
   async execute({ username, password }: IAuthenticateDeliveryman) {
      //Receber username,password

      //verificar se username cadastrado
      const deliveryman = await prisma.deliveryman.findFirst({
         where: {
            username
         }
      })

      if (!deliveryman) {
         throw new Error("Username or password invalid!")
      }
      //verificar se senha corresponde ao username
      const passwordMatch = await compare(password, deliveryman.password)

      if (!passwordMatch) {
         throw new Error("Username or password invalid!")
      }

      //gerar o token
      const token = sign({ username }, "4d9528682d3283ad207d72bcac528d01", {
         subject: deliveryman.id,
         expiresIn: "1d"
      })

      return token
   }
}