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

export { apiGetTodos, apiDeleteTodos, apiPostTodos }