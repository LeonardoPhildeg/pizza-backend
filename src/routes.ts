import { Router } from "express";
import multer from "multer";
import uploadConfig from "./config/multer";
import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { ListCategoryController } from "./controllers/category/ListCategoryController";
import { CreateItemController } from "./controllers/item/CreateItemController";
import { RemoveItemController } from "./controllers/item/RemoveItemController";
import { CreateOrderController } from "./controllers/order/CreateOrderController";
import { DetailOrderController } from "./controllers/order/DetailOrderController";
import { FinishOrderController } from "./controllers/order/FinishOrderController";
import { ListOrderController } from "./controllers/order/ListOrderController";
import { RemoveOrderController } from "./controllers/order/RemoverOrderController";
import { SendOrderController } from "./controllers/order/SendOrderController";
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


// CREATE ORDER
router.post("/order/add", isAuthenticated, new CreateOrderController().handle);
// DELETE ORDER
router.delete("/order/remove", isAuthenticated, new RemoveOrderController().handle);
// SEND ORDER
router.put("/order/send", isAuthenticated, new SendOrderController().handle);
// GET ORDERS THAT ARE BEING PRODUCED
router.get("/order/list", isAuthenticated, new ListOrderController().handle);
// GET ORDER DETAIL
router.get("/order/detail", isAuthenticated, new DetailOrderController().handle);
// GET ORDER DETAIL
router.put("/order/finish", isAuthenticated, new FinishOrderController().handle);


// CREATE ITEM
router.post("/item/add", isAuthenticated, new CreateItemController().handle);
// DELETE ITEM
router.delete("/item/remove", isAuthenticated, new RemoveItemController().handle);


export { router };
