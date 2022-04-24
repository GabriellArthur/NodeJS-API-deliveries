import { NextFunction, Request, Response } from "express";
import { verify } from 'jsonwebtoken'

interface IPayload{
   sub:string;
}

export async function ensureAuthenticateClient(request: Request, response: Response, next: NextFunction) {
   //Pegar o token
   const authHeader = request.headers.authorization;

   if (!authHeader) {
      return response.status(401).json({ message: "Token missing" })
   }

   //validar

   //Bearer 81273u8127314
   //[Bearer] [81273u8127314]
   const [, token] = authHeader.split(" ")

   try {
      //forcar o retorno ser string
      const { sub } = verify(token, "4d0028682d3283ad207d72bcac528d01") as IPayload
      //inserir novas atributos no meu request
      request.id_client = sub;
      return next()
   } catch (err) {
      return response.status(401).json({ message: "Invalid token" })
   }

}