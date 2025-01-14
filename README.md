## 📁 과제1

todo.js <br/>
1) 현재 exports 객체를 통해 요청에 대한 응답을 처리하는 구조로 작성되어 있음 <br/>
   라우팅 미들웨어를 적극적으로 활용하는 방식으로 todo.js를 리팩토링 <br/>
2) 임의의 라우터와, view(ejs)연결을 하나 더 구성 <br/>

---

1) 아래처럼 라우팅 미들웨어를 적극적으로 활용하는 방식으로 todo.js를 리팩토링
```
exports.list = async (req, res) => {
  ...
}
```
↓
```
router.get("/list", async (req, res) => {
...
});
```

<br/>
2) 임의의 라우터`routes/user.js`와, view(ejs) `views/user.ejs` 연결을 추가

 ```
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
 ```

```
<div class="container">
    <h1><%= title %></h1>

    <main>
      <ul>
        <li><strong>이름:</strong> <%= user.name %></li>
        <li><strong>소개:</strong> <%= user.description %></li>
      </ul>

      <a href="/" class="btn btn-secondary">메인으로 돌아가기</a>
    </main>
  </div>
```

---

## 🎬 TODO LIST 화면
<img width="722" alt="image" src="https://github.com/user-attachments/assets/63cb7b2b-03ed-4dcf-96ac-c3ad770d974e" />

## 🎬 유저 정보 화면
<img width="684" alt="image" src="https://github.com/user-attachments/assets/2862c81a-5379-4d59-931f-1ec26c8961d2" />


