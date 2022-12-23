import { Router } from "express";
import multer from "multer";
import uploadConfig from "./config/multer";
import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { ListCategoryController } from "./controllers/category/ListCategoryController";
import { CreateProductController } from "./controllers/product/CreateProductController";
import { ListProductByCategoryController } from "./controllers/product/ListProductByCategoryController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { CreateUserController } from "./controllers/user/CreateUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";
import { isAuthenticated } from "./midlewares/isAuthenticated";

const router = Router();
const upload = multer(uploadConfig.upload("./tmp"));

// CREATE USER
router.post("/user", new CreateUserController().handle);
// LOGIN
router.post("/session", new AuthUserController().handle);
// USER DETAILS
router.get("/userDetail", isAuthenticated, new DetailUserController().handle);


// CREATE CATEBORY
router.post("/category", isAuthenticated, new CreateCategoryController().handle);
// LIST CATEBORY
router.get("/category", isAuthenticated, new ListCategoryController().handle);


// CREATE PRODUCT
router.post("/product", isAuthenticated, upload.single("file"), new CreateProductController().handle);

// LIST PRODUCTS BY CATEGORY
router.get("/productByCategory", isAuthenticated, new ListProductByCategoryController().handle);


export { router };
