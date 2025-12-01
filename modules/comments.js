export let comments = []

export const updateComments = (newComments) => {
    comments = newComments
}

export const fetchComments = () => {
    return fetch('https://wedev-api.sky.pro/api/v1/dmitry-gerasimov/comments', {
        method: 'GET',
    })
        .then((response) => {
            if (!response.ok) {
                if (response.status === 500) {
                    throw new Error('Сервер сломался, попробуй позже')
                } else {
                    throw new Error('Ошибка загрузки: ' + response.status)
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
