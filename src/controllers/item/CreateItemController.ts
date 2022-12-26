import { Request, Response } from "express";
import { CreateItemService } from "../../services/item/CreateItemService";

class CreateItemController {
  async handle (req: Request, res: Response) {
    const {order_id, product_id, amount} = req.body;
    
    const itemService = new CreateItemService();
    const item = await itemService.execute({order_id, product_id, amount});

    return res.json(item);
  }
}

export { CreateItemController };
