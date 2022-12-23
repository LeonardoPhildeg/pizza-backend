import { User } from "@prisma/client";
import { prismaMock } from "../../../singleton";
import { CreateUserService } from "./CreateUserService";

test("teste", async () => {
  const user = {
    name: 'Rich',
    email: 'hello@prisma.io',
    password: "1234567890",
  } as User

  prismaMock.user.create.mockResolvedValue(user);
  const creatUserService = new CreateUserService();

  await expect(creatUserService.execute({
    name: user.name,
    email: user.email,
    password: user.password
  })).resolves.toMatchObject({
    name: 'Rich',
    email: 'hello@prisma.io',
    password: "1234567890",
  });
});