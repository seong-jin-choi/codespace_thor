import paginate from "express-paginate";
import express from "express";
import routes from "../routes";
import {
  getAdminLogin,
  postAdminLogin,
  getAdminRegister,
  postAdminRegister,
  adminLogout,
  getAdminChangePW,
  postAdminChangePW,
  adminUser,
  adminUserApprove,
  adminUserDelete,
  adminSample,
  getAdminSampleCrud,
  postAdminSampleCrud,
  adminProduct,
  getAdminProduct,
  postAdminProduct,
  adminMagazine,
  getAdminMagazine,
  postAdminMagazine,
} from "../controllers/adminController";
import { onlyAdmin, uploadSampleImg } from "../middlewares";

const adminRouter = express.Router();

// 관리자 로그인
adminRouter.get("/", getAdminLogin);
adminRouter.post(routes.adminLogin, postAdminLogin);

// 관리자 회원가입
adminRouter.get(routes.adminRegister, getAdminRegister);
adminRouter.post(routes.adminRegister, postAdminRegister);

// 로그아웃
adminRouter.get(routes.adminLogout, onlyAdmin, adminLogout);

// 비밀번호 변경
adminRouter.get(`${routes.adminChangePW}`, onlyAdmin, getAdminChangePW);
adminRouter.post(`${routes.adminChangePW}`, onlyAdmin, postAdminChangePW);

// 관리자 계정 관리
adminRouter.get(routes.adminUser, onlyAdmin, paginate.middleware(20, 50), adminUser);
adminRouter.get(`${routes.adminUser}/approve/:userID`, onlyAdmin, adminUserApprove);
adminRouter.get(`${routes.adminUser}/delete/:userID`, onlyAdmin, adminUserDelete);

// 관리자 샘플 관리
adminRouter.get(routes.adminSample, onlyAdmin, paginate.middleware(20, 50), adminSample);
adminRouter.get(`${routes.adminSample}/:crudType`, onlyAdmin, getAdminSampleCrud);
adminRouter.post(`${routes.adminSample}/:crudType`, onlyAdmin, uploadSampleImg, postAdminSampleCrud);

// 상품 데이터 관리
adminRouter.get(routes.adminProduct, onlyAdmin, paginate.middleware(20, 50), adminProduct);
adminRouter.get(`${routes.adminProduct}/:crudType`, onlyAdmin, getAdminProduct);
adminRouter.post(`${routes.adminProduct}/:crudType`, onlyAdmin, uploadSampleImg, postAdminProduct);

// 매거진 데이터 관리
adminRouter.get(routes.adminMagazine, onlyAdmin, paginate.middleware(20, 50), adminMagazine);
adminRouter.get(`${routes.adminMagazine}/:crudType`, onlyAdmin, getAdminMagazine);
adminRouter.post(`${routes.adminMagazine}/:crudType`, onlyAdmin, postAdminMagazine);

export default adminRouter;
