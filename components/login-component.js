import { apiLogin } from "../api.js";

function renderLoginComponent({ appEl, setToken, fetchTodosAndRender }) {
    let isLoginActive = true
    const renderForm = () => {
        const appHtml = `
        <div class="form">
        <h3 class="form-title">Форма ${isLoginActive ? "входа" : "регистрации"}</h3>
        <div class="form-row">
        ${isLoginActive ? "" : `<p>Имя</p> <input type="text" id="login-input" class="input" />`}
            <p>Логин</p>
            <input type="text" id="login-input" class="input" />
            <p>Пароль</p>
            <input type="text" id="password-input" class="input" />
        </div>
        <br />
        <button class="button" id="join-button">Войти</button>
    
        <button class="button" id="register-button">Перейти ${isLoginActive ? "к регистрации" : "ко входу"}</button>
    </div>`

        appEl.innerHTML = appHtml;
        const loginButton = document.getElementById("join-button").addEventListener("click", () => {
            const login = document.getElementById("login-input").value;
            const password = document.getElementById("password-input").value;

            if (!login) {
                alert("Введите логин")
                return
            }

            if (!password) {
                alert("Введите пароль")
                return
            }

            apiLogin({
                login: login,
                password: password,
            })
                .then((user) => {
                    console.log(user);
                    setToken(`Bearer ${user.user.token}`)
                    fetchTodosAndRender()
                })
                .catch((error) => {
                    alert(error.message)
                })


        })

        const registerButton = document.getElementById("register-button").addEventListener("click", () => {
            isLoginActive = !isLoginActive
            renderForm()
        })
    }
    renderForm()
}


export { renderLoginComponent }