import paginate from "express-paginate";
import routes from "../routes";
import Product from "../models/Product";

// 홈 Home
export const home = async (req, res) => {
  try {
    res.render("home");
  } catch (err) {
    console.log(err);
    res.send(
      `<script>alert("오류가 발생했습니다:\\r\\n${err}");\
      location.href="${routes.home}"</script>`
    );
  }
};

// 상품 페이지
export const product = async (req, res) => {
  try {
    const {
      query: { sort, searchCode, searchValue, limit },
    } = req;

    // findQuery default 값
    const findQuery = {};
    // sortQuery default 값
    let sortQuery = { createdAt: -1 };
    // BEGIN: 분류 기능이 있을 경우
    const sortArr = [
      { code: "0", title: "가격낮은순", value: { $expr: { $multiply: ["price", "discountRate"] } }, order: 1 },
      { code: "1", title: "가격높은순", value: { $expr: { $multiply: ["price", "discountRate"] } }, order: -1 },
      { code: "2", title: "최신순", value: "createdAt", order: -1 },
      { code: "3", title: "이름순", value: "name", order: 1 },
    ];
    const sortCode = sort || sortArr[0].code;
    if (sort) {
      sortQuery = {};
      sortArr.forEach((x, i) => {
        if (x.code === sort) sortQuery[`${sortArr[i].value}`] = sortArr[i].order;
      });
    }
    // END: 분류 기능이 있을 경우

    const makeProductItems = async (sortCodeParam) => {
      if (sortCodeParam === "0" || sortCodeParam === "1") {
        const sortRule = sortCodeParam === "0" ? 1 : -1;
        const result = await Product.aggregate([
          {
            $addFields: {
              discountedPrice: {
                $subtract: ["$price", { $multiply: ["$price", { $multiply: ["$discountRate", 0.01] }] }],
              },
            },
          },
          {
            $sort: { discountedPrice: sortRule }, // 내림차순 정렬
          },
          {
            $limit: limit,
          },
          {
            $skip: req.skip,
          },
        ]);
        const totalCount = await Product.countDocuments();
        return [result, totalCount];
      } else {
        const [items, itemsTotalCount] = await Promise.all([
          Product.find(findQuery).sort(sortQuery).limit(limit).skip(req.skip).exec(),
          Product.countDocuments(findQuery),
        ]);
        return [items, itemsTotalCount];
      }
    };

    const [productItems, totalCount] = await makeProductItems(sort);
    const pageCount = Math.ceil(totalCount / limit);
    const pages = paginate.getArrayPages(req)(10, pageCount, req.query.page);
    // END: pagination 데이터

    res.render("product", {
      sortCode,
      sortArr,
      limit,
      searchCode,
      searchValue,
      productItems,
      totalCount,
      pageCount,
      pages,
    });
  } catch (err) {
    console.log(err);
    res.send(
      `<script>alert("오류가 발생했습니다:\\r\\n${err}");\
      location.href="${routes.home}"</script>`
    );
  }
};

export const anotherController = () => {};
