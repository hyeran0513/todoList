document.addEventListener("DOMContentLoaded", () => {
  // 초기 목록 불러오기
  fetchTodoList();

  // 추가버튼 이벤트
  const addButton = document.querySelector(".btn-primary");
  addButton.addEventListener("click", addTodo);

  // 목록 불러오기 함수
  async function fetchTodoList() {
    try {
      const response = await fetch("/list");
      const data = await response.json();
      renderTodoList(data.list);
    } catch (error) {
      console.error("목록 불러오기 실패 ㅠㅠ", error);
    }
  }

  // todo 목록 랜더링 함수
  function renderTodoList(list) {
    const tbody = document.querySelector("#todo-list");
    tbody.innerHTML = list
      .map(
        (todo, index) => `
          <tr>
            <td>${index + 1}</td>
            <td class="${todo.complete ? "completed" : ""}" class="${
          todo.del ? "deleted" : ""
        }">
              ${todo.contents}
            </td>
            <td>
              <button type="button" class="btn btn-success complete-btn" data-id="${
                todo.id
              }">완료</button>                
            </td>
            <td>
              <button type="button" class="btn btn-danger delete-btn" data-id="${
                todo.id
              }">삭제</button>                
            </td>
          </tr>
      `
      )
      .join("");

    // 완료/삭제 버튼 이벤트 리스너
    tbody.addEventListener("click", async (event) => {
      const target = event.target;
      const id = Number(target.dataset.id);

      if (target.classList.contains("complete-btn")) {
        await completeTodo(id);
      }

      if (target.classList.contains("delete-btn")) {
        await deleteTodo(id);
      }
    });
  }

  async function addTodo() {
    const todoInput = document.getElementById("new_todo");
    const contents = todoInput.value.trim();

    if (!contents) {
      alert("할 일을 입력해주세요.");
      return;
    }

    try {
      const response = await fetch("/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ contents }),
      });

      if (response.ok) {
        todoInput.value = "";
        fetchTodoList();
      }
    } catch (error) {
      console.error("Todo 추가 실패:", error);
    }
  }

  // 완료함수
  async function completeTodo(id) {
    try {
      const response = await fetch("/complete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        fetchTodoList();
      }
    } catch (error) {
      console.error("todo 완료 실패 : ", error);
    }
  }

  // 삭제 함수
  async function deleteTodo(id) {
    try {
      const response = await fetch("/del", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        fetchTodoList();
      } else {
        const errorData = await response.json();
        alert(`삭제 실패: ${errorData.error}`);
      }
    } catch (error) {
      console.error("todo 삭제 실패:", error);
    }
  }
});