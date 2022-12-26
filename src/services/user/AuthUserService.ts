import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import prismaClient from "../../prisma";

interface AuthRequest {
  email: string,
  password: string
}

class AuthUserService {
  async execute({email, password}: AuthRequest) {
    const user = await prismaClient.user.findFirst({
      where: {
        email: email
      }
    })
    if (!user) {
      throw new Error("User not found")
    }

    const passwordMatch = await compare(password, user.password)
    if(!passwordMatch) {
      throw new Error("User/Password incorrect")
    }
    const secret = process.env.JWT_SECRET as string;
    const token = sign({
      name: user.name,
      email: user.email,
    }, secret,
    {
      subject: user.id,
      expiresIn: "30d"
    })

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      token: token
    }
  }
}

export { AuthUserService };
