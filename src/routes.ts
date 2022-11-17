import { Router } from "express";
import { CreateCategoryController } from "./controllers/category/createCategoryController";
import { AuthUserController } from "./controllers/user/authUserController";
import { CreateUserController } from "./controllers/user/createUserController";
import { DetailUserController } from "./controllers/user/detailUserController";
import { isAuthenticated } from "./midlewares/isAuthenticated";

const router = Router();

// USER
router.post("/user", new CreateUserController().handle)

router.post("/session", new AuthUserController().handle)

router.get("/userDetail", isAuthenticated, new DetailUserController().handle)

// CATEGORY
router.post("/category", new CreateCategoryController().handle)

export { router };
