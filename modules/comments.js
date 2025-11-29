export let comments = []

export const updateComments = (newComments) => {
    comments = newComments
}

export const fetchComments = () => {
    return fetch('https://wedev-api.sky.pro/api/v1/dmitry-gerasimov/comments', {
        method: 'GET',
    })
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            updateComments(data.comments)
            return data.comments
        })
}
