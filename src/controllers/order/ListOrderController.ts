import { Response } from "express";
import { ListOrderService } from "../../services/order/ListOrderService";

class ListOrderController {
  async handle (res: Response) {
    const listService = new ListOrderService();
    const orders = await listService.execute();

    return res.json(orders);
  }
}

export { ListOrderController };
