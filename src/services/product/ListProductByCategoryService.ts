import prismaCLient from "../../prisma";

interface ProductRequest {
  category_id: string
}

class ListProductByCategoryService {
  async execute ({category_id}: ProductRequest) {
    const findByCategory = await prismaCLient.product.findMany({
      where: {
        category_id
      }
    })

    return findByCategory;
  }
}

export { ListProductByCategoryService };
