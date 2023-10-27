import express from "express";
// import {} from "../controllers/apiController";
import { uploadSampleDescImg, uploadSampleImg, deleteSampleImg } from "../middlewares";

const apiRouter = express.Router();

apiRouter.post("/create/sample-desc-img", uploadSampleDescImg, (req, res) => {
  res.send(req.file.location);
});

apiRouter.post("/create/profileImg", uploadSampleImg, (req, res) => {
  if (!req.file) return res.sendStatus(400);
  return res.send({ location: req.file.location, key: req.file.key });
});
apiRouter.post("/delete/profileImg", (req, res) => {
  if (!req.body.key) {
    return res.sendStatus(400).json({ message: "body가 비었음" });
  } else {
    const key = req.body.key;
    return deleteSampleImg(key)
      .then(() => {
        res.sendStatus(200);
      })
      .catch((err) => {
        res.sendStatus(400).json(err);
      });
  }
});

export default apiRouter;
