const host = "https://webdev-hw-api.vercel.app/api/v2/todos";

//API get
function apiGetTodos({ token }) {
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
}

//API delete
function apiDeleteTodos({ token, id }) {
    return fetch("https://webdev-hw-api.vercel.app/api/todos/" + id, {
        method: "DELETE",
        headers: {
            Authorization: token,
        }
    })
        .then((response) => {
            return response.json();
        })
}

//API post
function apiPostTodos({ token, text }) {
    return fetch(host, {
        method: "POST",
        headers: {
            Authorization: token,
        },
        body: JSON.stringify({
            text,
        }),
    })
        .then((response) => {
            return response.json();
        })
}

//API login
function apiLogin({ login, password }) {
    return fetch("https://webdev-hw-api.vercel.app/api/user/login", {
        method: "POST",
        body: JSON.stringify({
            login,
            password,
        }),
    })
        .then((response) => {
            if (response.status === 400) {
                throw new Error("Неверный логин или пароль")
            } else {
                return response.json()
            }
        })
}

//API registration
function apiRegister({ name, login, password }) {
    return fetch("https://webdev-hw-api.vercel.app/api/user", {
        method: "POST",
        body: JSON.stringify({
            name,
            login,
            password,
        })
    })
        .then((response) => {
            if (response.status === 400) {
                throw new Error("Такой логин уже существует")
            } else {
                return response.json()
            }
        })
}

export { apiGetTodos, apiDeleteTodos, apiPostTodos, apiLogin, apiRegister }
