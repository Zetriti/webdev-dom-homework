import { renderComments } from './renderComments.js'
import { toggleLike } from './comments.js'
import { fetchComments } from './comments.js'

const textInput = document.querySelector('.add-form-text')

export function initReplyСomment() {
    const comments = document.querySelectorAll('.comment')

    comments.forEach((comment) => {
        comment.addEventListener('click', function () {
            const textToInsert = this.dataset.text
            if (textInput) {
                textInput.value = textToInsert
            }
        })
    })
}

export const initLikeComments = () => {
    const commentsLikeButtons = document.querySelectorAll('.like-button')

    for (const commentLikeButton of commentsLikeButtons) {
        commentLikeButton.addEventListener('click', (event) => {
            event.stopPropagation()
            const id = commentLikeButton.dataset.id

            toggleLike(id)
                .then(() => {
                    return fetchComments()
                })
                .then(() => {
                    renderComments()
                })
                .catch((error) => {
                    console.error('Ошибка при лайке:', error)
                    alert('Не удалось поставить лайк. Проверьте авторизацию.')
                })
        })
    }
}
