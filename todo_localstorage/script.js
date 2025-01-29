const todoInput = document.getElementById("todo");
const tagsInput = document.getElementById("tags");
const lists = document.getElementById("lists");

// Display Date
const today = new Date();
const year = today.getFullYear();
const month = (today.getMonth() + 1).toString().padStart(2, '0'); // 月份從0開始，所以要加1
const day = today.getDate().toString().padStart(2, '0');
const formattedDate = `${year}/${month}/${day}`;
document.getElementById('date').innerText = formattedDate;



// ==========================================
// 本地儲存讀取
function loadTodos() {
    const todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos.forEach(todo => addToList(todo));
}

// 將任務新增至清單
function addToList({ name, tags, createdAt, completed }) {
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";

    // 完成狀態
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = completed;
    checkbox.className = "form-check-input me-2";
    checkbox.addEventListener("change", () => {
        todo.completed = checkbox.checked;
        saveTodos();
    });

    // 任務名稱及標籤
    const taskInfo = document.createElement("div");
    taskInfo.className = "d-flex flex-column";
    taskInfo.innerHTML = `<span>${name}</span><small class="text-muted">${tags || ""}</small>`;

    // 創建時間
    const dateText = document.createElement("span");
    dateText.className = "text-muted small ms-2";
    dateText.textContent = createdAt;

    // 刪除按鈕
    const deleteButton = document.createElement("button");
    deleteButton.className = "btn btn-sm btn-danger ms-2";
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => {
        li.remove();
        removeTodo(name);
    });

    li.appendChild(checkbox);
    li.appendChild(taskInfo);
    li.appendChild(dateText);
    li.appendChild(deleteButton);

    lists.appendChild(li);
}

// 新增任務功能
function add(event) {
    event.preventDefault();
    const name = todoInput.value.trim();
    const tags = tagsInput.value.trim();
    const createdAt = new Date().toLocaleDateString();

    if (!name) return;

    const todo = { name, tags, createdAt, completed: false };
    addToList(todo);
    saveTodo(todo);

    todoInput.value = "";
    tagsInput.value = "";
}

// 儲存至本地儲存
function saveTodos() {
    const todos = Array.from(lists.children).map(li => {
        const checkbox = li.querySelector("input[type='checkbox']");
        const taskName = li.querySelector("div span").textContent;
        const taskTags = li.querySelector("div small").textContent;
        const createdAt = li.querySelector("span.text-muted").textContent;

        return {
            name: taskName,
            tags: taskTags,
            createdAt,
            completed: checkbox.checked
        };
    });
    localStorage.setItem("todos", JSON.stringify(todos));
}

// 儲存單個任務至本地儲存
function saveTodo(todo) {
    const todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

// 刪除任務
function removeTodo(name) {
    let todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos = todos.filter(todo => todo.name !== name);
    localStorage.setItem("todos", JSON.stringify(todos));
}

// 初始化載入任務
loadTodos();