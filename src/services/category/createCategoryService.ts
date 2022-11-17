import prismaClient from "../../prisma";

interface CategoryRequest {
  name: string
}

class CreateCategoryService {
  async execute({name}: CategoryRequest){
    if(!name){
      throw new Error("Campo obrigatório!")
    }

    const categoryExists = await prismaClient.category.findFirst({
      where: {
        name: name.toLowerCase()
      }
    })

    if(categoryExists){
      throw new Error("Category already exists")
    }

    const category = await prismaClient.category.create({
      data: {
        name: name
      },
      select: {
        id: true,
        name: true
      }
    })

    return category;
  }
}

export { CreateCategoryService };
