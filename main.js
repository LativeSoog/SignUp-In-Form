let tasks = [];
const host = "https://webdev-hw-api.vercel.app/api/v2/todos";
let token = "Bearer asb4c4boc89kbocw6gasb4c4boc86g9kbocwasc0bodg"

const fetchTodosAndRender = () => {
    return fetch(host, {
        method: "GET",
        headers: {
            Authorization: token
        }
    })
        .then((response) => {
            if (response.status === 401) {
                // token = prompt('Введите правильный пароль')
                // fetchTodosAndRender()
                throw new Error('Неверный пароль')
            } else {
                return response.json();
            }
        })
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
            fetch("https://webdev-hw-api.vercel.app/api/todos/" + id, {
                method: "DELETE",
                headers: {
                    Authorization: token,
                }
            })
                .then((response) => {
                    return response.json();
                })
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
        fetch(host, {
            method: "POST",
            headers: {
                Authorization: token,
            },
            body: JSON.stringify({
                text: textInputElement.value,
            }),
        })
            .then((response) => {
                return response.json();
            })
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