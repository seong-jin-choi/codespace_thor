import express from "express";
// import {} from "../controllers/apiController";
import { uploadSampleDescImg, uploadSampleImg, deleteSampleImg } from "../middlewares";
import Product from "../models/Product";
const apiRouter = express.Router();

apiRouter.post("/create/sample-desc-img", uploadSampleDescImg, (req, res) => {
  res.send(req.file.location);
});

apiRouter.post("/create/profileImg", uploadSampleImg, (req, res) => {
  if (!req.file) return res.sendStatus(400);
  return res.send({ location: req.file.location, key: req.file.key });
});
apiRouter.post("/delete/profileImg/:itemID", async (req, res) => {
  if (!req.user) return res.status(403).json("Not Authenticated");
  const { itemID } = req.params;
  if (!itemID) return res.sendStatus(400);
  await Product.findByIdAndUpdate(itemID, { thumbnail: req.body.basicImgUrl });
  const key = req.body.key;
  if (key) {
    deleteSampleImg(key).then(() => {
      res.sendStatus(200);
    });
  }
  return res.sendStatus(200);
});

export default apiRouter;
