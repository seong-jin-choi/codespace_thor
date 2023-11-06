import express from "express";
import paginate from "express-paginate";
import routes from "../routes";
import { home, product } from "../controllers/globalController";

const globalRouter = express.Router();

// 홈 Home
globalRouter.get(routes.home, home);
globalRouter.get(routes.product, paginate.middleware(20, 50), product);

export default globalRouter;
