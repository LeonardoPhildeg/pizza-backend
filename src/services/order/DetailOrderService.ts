import prismaCLient from "../../prisma";

interface DetailOrder {
  order_id: string
}

class DetailOrderService {
  async execute({order_id}: DetailOrder){
    const orderDetail = await prismaCLient.item.findMany({
      where: {
        order_id
      },
      // USE INCLUDE TO RETURN ABOUT PRODUCT AND ORDER
      include: {
        product:{
          select: {
            name: true,
            price: true
          }
        },
        order: {
          select: {
            table: true,
            status: true,
            draft: true,
            createdAt: true
          }
        }
      }
    })

    return orderDetail;
  }
}

export { DetailOrderService };
