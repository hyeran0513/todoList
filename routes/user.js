const express = require("express");
const router = express.Router();

const userInfo = {
  name: "Kim Hye Ran",
  description: "이스트소프트 프론트엔드 부트캠프 수강 중이에요"
};

router.get("/", (req, res) => {
  res.render("user", {
    title: "사용자 정보",
    user: userInfo,
  });
});

module.exports = router;