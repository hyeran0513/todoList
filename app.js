const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

// 라우터 require
const indexRouter = require("./routes/index");
const todoRouter = require("./routes/todo");
const userRouter = require("./routes/user");

app.use(express.json()); // JSON 요청이 오면 그 본문을 파싱
app.use(express.urlencoded({ extended: true })); // URL 인코딩 데이터 파싱

// 뷰 EJS 설정
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// 프록시 신뢰 설정
app.set("trust proxy", true);

// 정적 파일 경로 설정
app.use(express.static(path.join(__dirname, "static")));

// 라우터 설정
app.use("/", indexRouter);
app.use("/", todoRouter);
app.use("/user", userRouter);

// 각 요청에 대해 todoRouter 대응 함수(list, add, complete)를 실행
// app.get("/list", (req, res) => todoRouter.list(req, res));
// app.post("/add", (req, res) => todoRouter.add(req, res));
// app.post("/complete", (req, res) => todoRouter.complete(req, res));
// app.post("/del", (req, res) => todoRouter.del(req, res));

// 서버 시작
const server = app.listen(PORT, () => {
  console.log(`
  🚀 서버 실행 정보 
  - 포트: ${PORT}
  - 환경: ${process.env.NODE_ENV || "development"}
  - 주소: http://localhost:${PORT}
`);
});

server.timeout = 5000; // 5초간 서버 응답이 없을 경우 타임아웃 처리.
module.exports = app; // 다른 모듈에서 앱을 사용할 수 있도록 처리