import prismaCLient from "../../prisma";

interface FinishOrder {
  order_id: string
}

class FinishOrderService {
  async execute({order_id}: FinishOrder){
    const order = await prismaCLient.order.update({
      where: {
        id: order_id
      },
      data: {
        status: true
      }
    })

    return order;
  }
}

export { FinishOrderService };
