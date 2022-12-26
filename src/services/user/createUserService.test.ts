import { User } from "@prisma/client";
import { prismaMock } from "../../../singleton";
import { CreateUserService } from "./CreateUserService";

describe("User service", () => {
  test("Create user success", async () => {
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
  test("Email undefined", async () => {
    const user = {
      name: 'Rich',
      password: "1234567890",
    } as User
  
    const creatUserService = new CreateUserService();
  
    await expect(creatUserService.execute({
      name: user.name,
      email: user.email,
      password: user.password
    })).rejects.toThrow("Email incorrect");
  });
  test("User already exists", async () => {
    const user = {
      name: 'Rich',
      email: 'hello@prisma.io',
      password: "1234567890",
    } as User
  
    prismaMock.user.create.mockResolvedValue(user);
    prismaMock.user.findFirst.mockResolvedValue(user);
    const creatUserService = new CreateUserService();
  
    await expect(creatUserService.execute({
      name: user.name,
      email: user.email,
      password: user.password
    })).rejects.toThrow("User already exists");
  });
})