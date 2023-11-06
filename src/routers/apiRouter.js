import express from "express";
import moment from "moment-timezone";
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
    await deleteSampleImg(key);
    return res.sendStatus(200);
  }
  return res.sendStatus(200);
});

apiRouter.post("/creatDummy", async (req, res) => {
  function getRandomClothingName() {
    const adjectives = ["빨간", "파란", "초록", "노란", "검정", "하얀", "줄무늬", "땡땡이"];
    const nouns = ["셔츠", "드레스", "바지", "모자", "양말", "자켓", "스커트", "스웨터"];
    const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
    const randomName = `${randomAdjective} ${randomNoun}`;
    return randomName;
  }
  function getRandomBrand() {
    const brands = ["Nike", "Adidas", "Puma", "Reebok", "Converse", "Vans", "Under Armour", "New Balance", "Fila", "ASICS"];
    const randomIndex = Math.floor(Math.random() * brands.length);
    return brands[randomIndex];
  }
  function getRandomCategories() {
    const categories = ["가디건", "니트/베스트", "셔츠/남방", "자켓", "점퍼/패딩", "정장/수트", "코트", "맨투맨/후드/티셔츠", "팬츠"];
    const randomIndex = Math.floor(Math.random() * categories.length);
    return categories[randomIndex];
  }

  function getRandomThumnailes() {
    const domain = "https://codespace-bentley.s3.ap-northeast-2.amazonaws.com/sample/";
    const thumbnailes = [
      "1000266062917_i2_290.avif",
      "1000266472821_i1_290.avif",
      "1000559148057_i2_290.avif",
      "1000561077984_i2_290.avif",
      "1000561272581_i1_290.avif",
    ];
    const randomIndex = Math.floor(Math.random() * thumbnailes.length);
    return domain + thumbnailes[randomIndex];
  }

  function getRandomPrice() {
    const randomNumber = Math.floor(Math.random() * 901) + 100;
    return randomNumber;
  }
  function getRandomDiscountRate() {
    const randomNumber = Math.floor(Math.random() * 101);
    return randomNumber;
  }
  const description =
    "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).";

  const makeDummy = () => {
    const body = {
      thumbnail: getRandomThumnailes(),
      name: getRandomClothingName(),
      description,
      price: getRandomPrice(),
      brand: getRandomBrand(),
      discountRate: getRandomDiscountRate(),
      category: getRandomCategories(),
      createdAt: moment(new Date()).tz("Asia/Seoul"),
    };
    return body;
  };
  for (let i = 0; i < 50; i += 1) {
    await Product.create(makeDummy());
  }

  return res.sendStatus(200);
});

export default apiRouter;
