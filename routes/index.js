const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index", {
    title: "Todo 애플리케이션",
  });
});

module.exports = router;