import $ from "jquery";

const adminProductPage = document.getElementById("admin__product-page");
const pofileImg = $("img.profile__img");
const inputImg = $("input#thumbnail-img");
const deleteBtn = $("button#delete__thumnail");
const form = $("form.browser-default-validation.admin__form");

if (adminProductPage) {
  (() => {
    $(() => {
      pofileImg.on("click", () => {
        inputImg.trigger("click");
      });
      inputImg.on("change", () => {
        const file = inputImg[0].files[0];
        const reader = new FileReader();
        reader.onload = function (e) {
          pofileImg.attr("src", e.target.result);
        };
        if (file && file.type.startsWith("image/")) {
          reader.readAsDataURL(file);
        }
      });
      deleteBtn.on("click", (e) => {
        e.preventDefault();
        function extractItemID(queryString) {
          const match = queryString.match(/[?&]itemID=([^&]+)/);
          if (match) {
            return match[1];
          }
          return null;
        }
        const queryString = window.location.search;
        const itemID = extractItemID(queryString);
        if (!queryString || !itemID) return;
        const src = pofileImg.attr("src");
        const basicImgUrl = `/images/admin/user.png`;
        const parts = src.split("amazonaws.com/");
        const key = parts[parts.length - 1];
        $.ajax({
          url: `/api/delete/profileImg/${itemID}`,
          type: "POST",
          data: { key, basicImgUrl },
          success: (result) => {
            pofileImg.attr("src", basicImgUrl);
            inputImg.val("");
          },
          error: (err) => {
            alert(`오류가 발생했습니다:::\r\n${JSON.stringify(err)}`);
          },
        });
      });
    });
  })();
}
