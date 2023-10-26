import $ from "jquery";

const adminProductPage = document.getElementById("admin__product-page");
const pofileImg = $("img.profile__img");
const inputImg = $("input#thumbnail-img");
const deleteBtn = $("button#delete__thumnail");

if (adminProductPage) {
  (() => {
    $(() => {
      pofileImg.on("click", () => {
        inputImg.trigger("click");
      });
      inputImg.on("change", () => {
        const data = new FormData();
        const file = inputImg[0].files[0];
        data.append("thumbnail", file);
        if (!file) return;
        $.ajax({
          url: "/api/create/profileImg",
          type: "POST",
          data,
          contentType: false,
          processData: false,
          success: (result) => {
            console.log(result);
            pofileImg.attr("src", result.location);
            pofileImg.attr("key", result.key);
          },
          error: (err) => {
            alert(`오류가 발생했습니다:::\r\n${JSON.stringify(err)}`);
          },
        });
      });
      deleteBtn.on("click", (e) => {
        e.preventDefault();
        const key = pofileImg.attr("key");
        if (!key) return;
        $.ajax({
          url: "/api/delete/profileImg",
          type: "POST",
          data: { key },
          success: (result) => {
            pofileImg.attr("src", `/images/admin/user.png`);
          },
          error: (err) => {
            alert(`오류가 발생했습니다:::\r\n${JSON.stringify(err)}`);
          },
        });
      });
    });
  })();
}
