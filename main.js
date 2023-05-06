import { apiDeleteTodos, apiGetTodos, apiPostTodos } from "./api.js";

let tasks = [];
let token = "Bearer asb4c4boc89kbocw6gasb4c4boc86g9kbocwasc0bodg"

const fetchTodosAndRender = () => {
    return apiGetTodos({ token })
        .then((responseData) => {
            tasks = responseData.todos;
            renderApp();
        });
};

token = null

const renderApp = () => {
    const appEl = document.getElementById('app')
    if (!token) {
        const appHtml = `
        <div class="form">
        <h3 class="form-title">Форма входа</h3>
        <div class="form-row">
            <p>Логин</p>
            <input type="text" id="login-input" class="input" />
            <p>Пароль</p>
            <input type="text" id="login-input" class="input" />
        </div>
        <br />
        <button class="button" id="join-button">Войти</button>
    </div>`

        appEl.innerHTML = appHtml;
        const loginButton = document.getElementById("join-button").addEventListener("click", () => {
            token = "Bearer asb4c4boc89kbocw6gasb4c4boc86g9kbocwasc0bodg"
            fetchTodosAndRender()
        })
        return;
    }

    const tasksHtml = tasks
        .map((task) => {
            return `
      <li class="task">
        <p class="task-text">
          ${task.text}
          <button data-id="${task.id}" class="button delete-button">Удалить</button>
        </p>
      </li>`;
        })
        .join("");

    const appHtml = `
    <h1>Список задач</h1>
    <ul class="tasks" id="list">
        <!-- Список рендерится из JS -->
        ${tasksHtml}
    </ul>
    <br />
    <div class="form">
        <h3 class="form-title">Форма добавления</h3>
        <div class="form-row">
            Что нужно сделать:
            <input type="text" id="text-input" class="input" placeholder="Выпить кофе" />
        </div>
        <br />
        <button class="button" id="add-button">Добавить</button>
    </div>`

    appEl.innerHTML = appHtml;

    const buttonElement = document.getElementById("add-button");
    const listElement = document.getElementById("list");
    const textInputElement = document.getElementById("text-input");

    const deleteButtons = document.querySelectorAll(".delete-button");

    for (const deleteButton of deleteButtons) {
        deleteButton.addEventListener("click", (event) => {
            event.stopPropagation();

            const id = deleteButton.dataset.id;

            // Подписываемся на успешное завершение запроса с помощью then
            apiDeleteTodos({ token, id })
                .then((responseData) => {
                    // Получили данные и рендерим их в приложении
                    tasks = responseData.todos;
                    renderApp();
                });

            renderApp();
        });
    }
    buttonElement.addEventListener("click", () => {
        if (textInputElement.value === "") {
            return;
        }

        buttonElement.disabled = true;
        buttonElement.textContent = "Задача добавляется...";

        // Подписываемся на успешное завершение запроса с помощью then
        apiPostTodos({ token, text: textInputElement.value })
            .then(() => {
                // TODO: кинуть исключение
                textInputElement.value = "";
            })
            .then(() => {
                return fetchTodosAndRender();
            })
            .then(() => {
                buttonElement.disabled = false;
                buttonElement.textContent = "Добавить";
            })
            .catch((error) => {
                console.error(error);
                alert("Кажется, у вас проблемы с интернетом, попробуйте позже");
                buttonElement.disabled = false;
                buttonElement.textContent = "Добавить";
            });

        renderApp();
    });
};

renderApp();