import { prisma } from "../../../../database/prismaClient";


export class FindAllDeliveriesUseCase {
   async execute(id_client: string) {
      const deliveries = await prisma.clients.findMany({
         where: {
            id: id_client
         },
         select: {
            id: true,
            username: true,
            deliveries: true,
         },
      })
      /**
      const deliveries = await prisma.deliveries.findMany({
         where:{
            id_client
         }
      })
      */

      return deliveries;
   }
}