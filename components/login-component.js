import { apiLogin } from "../api.js";

function renderLoginComponent({ appEl, setToken, fetchTodosAndRender }) {
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
        setToken("Bearer asb4c4boc89kbocw6gasb4c4boc86g9kbocwasc0bodg")
        apiLogin({
            login: 'admin',
            password: 'admin',
        })
            .then((user) => {
                console.log(user);
                setToken(`Bearer ${user.user.token}`)
                fetchTodosAndRender()
            })


    })
}

export { renderLoginComponent }