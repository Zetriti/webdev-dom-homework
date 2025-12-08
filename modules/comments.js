export const host = 'https://wedev-api.sky.pro/api/v2/dmitry-gerasimov'
export const autoHost = 'https://wedev-api.sky.pro/api/user'

export let token = ''

export const setToken = (newToken) => {
    token = newToken
}

export let name = ''

export const setName = (newName) => {
    name = newName
}

export let comments = []

export const updateComments = (newComments) => {
    comments = newComments
}

export const fetchComments = () => {
    return fetch(host + '/comments', {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
        .then((response) => {
            if (!response.ok) {
                if (response.status === 500) {
                    throw new Error('Сервер сломался, попробуй позже')
                } else {
                    console.log('Response not ok, but not 500')
                }
            }
            return response.json()
        })
        .then((data) => {
            updateComments(data.comments)
            return data.comments
        })
        .catch((error) => {
            if (
                error.name === 'TypeError' &&
                error.message === 'Failed to fetch'
            ) {
                throw new Error(
                    'Кажется, у вас сломался интернет, попробуйте позже',
                )
            }
            throw error
        })
}

export const login = (login, password) => {
    return fetch(autoHost + '/login', {
        method: 'POST',
        body: JSON.stringify({ login: login, password: password }),
    })
}
export const registration = (name, login, password) => {
    return fetch(autoHost, {
        method: 'POST',
        body: JSON.stringify({ name: name, login: login, password: password }),
    })
}

export const toggleLike = (id) => {
    if (!token) {
        throw new Error('Нет авторизации')
    }

    return fetch(`${host}/comments/${id}/toggle-like`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }).then((response) => {
        if (!response) {
            if (response.status === 401) {
                throw new Error('Нет авторизации')
            } else if (response.status === 500) {
                throw new Error('Сервер сломался, попробуй позже')
            } else {
                throw new Error('Ошибка сервера: ' + response.status)
            }
        }
        return response.json()
    })
}
