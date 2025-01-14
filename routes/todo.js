const express = require("express");
const router = express.Router();
const fs = require("fs").promises;
const path = require("path");

const TODO_FILE_PATH = path.join(__dirname, "todo_list.json");

async function readTodoFile() {
  try {
    const data = await fs.readFile(TODO_FILE_PATH, "utf8");
    return JSON.parse(data);
  } catch (error) {
    //리스트 초기화
    const initialList = { list: [] };
    
    await fs.writeFile(TODO_FILE_PATH, JSON.stringify(initialList));
    
    return initialList;
  }
}

// 목록 조회
router.get("/list", async (req, res) => {
  try {
    const todoList = await readTodoFile();
    res.json(todoList);
  } catch (error) {
    res.status(500).json({ error: "목록 조회 실패" });
  }
});

// 추가
router.post("/add", async (req, res) => {
  try {
    const { contents } = req.body;

    if (!contents) {
      return res.status(400).json({ error: "내용 입력 바람." });
    }

    const todoList = await readTodoFile();

    const newTodo = {
      id: Date.now(),
      contents,
      complete: false,
      createdAt: new Date(),
    };

    todoList.list.push(newTodo);
    await fs.writeFile(TODO_FILE_PATH, JSON.stringify(todoList), "utf8");
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ error: "항목 추가 실패" });
  }
});

// 완료
router.post("/complete", async (req, res) => {
  try {
    const { id } = req.body;
  
    const todoList = await readTodoFile();

    // 특정 todo리스트 항목 찾기
    const todoIndex = todoList.list.findIndex((todo) => todo.id === id);

    // 동시접속
    if (todoIndex === -1) {
      return res.status(404).json({ error: "해당 todo 없어용" });
    }

    // complete 상태 전환.
    todoList.list[todoIndex].complete = !todoList.list[todoIndex].complete;

    await fs.writeFile(TODO_FILE_PATH, JSON.stringify(todoList), "utf8");
    res.json(todoList.list[todoIndex]);
  } catch (error) {
    res.status(500).json({ error: "상태변경실패" });
  }
});

//삭제
router.post("/del", async (req, res) => {
  try {
    const { id } = req.body;

    const todoList = await readTodoFile();

    const todoIndex = todoList.list.findIndex((todo) => todo.id === id);

    if (todoIndex === -1) {
      return res.status(404).json({ error: "해당 todo 없어용" });
    }

    todoList.list.splice(todoIndex, 1);

    await fs.writeFile(TODO_FILE_PATH, JSON.stringify(todoList), "utf8");
    res.status(200).json({ message: "삭제성공" });
  } catch (error) {
    res.status(500).json({ error: "삭제실패" });
  }
});

module.exports = router;