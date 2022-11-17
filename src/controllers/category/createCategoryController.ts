import { Request, Response } from "express";
import { CreateCategoryService } from "../../services/category/createCategoryService";

class CreateCategoryController {
  async handle (req: Request, res: Response) {
    const {} = req.body

    const creatCategoryService = new CreateCategoryService();
    const category = await creatCategoryService.execute();

    return res.json(category);
  }
}

export { CreateCategoryController };

