import { comments } from './comments.js'
import { renderComments } from './renderComments.js'

const textInput = document.querySelector('.add-form-text')

export function initReplyСomment() {
    const comments = document.querySelectorAll('.comment')

    comments.forEach((comment) => {
        comment.addEventListener('click', function () {
            const textToInsert = this.dataset.text
            textInput.value = textToInsert
        })
    })
}

export const initLikeComments = () => {
    const commentsLikeButtons = document.querySelectorAll('.like-button')

    for (const commentLikeButton of commentsLikeButtons) {
        commentLikeButton.addEventListener('click', (event) => {
            event.stopPropagation()
            const index = commentLikeButton.dataset.index

            if (comments[index].isLiked) {
                comments[index].isLiked = false
                comments[index].likes--
            } else {
                comments[index].isLiked = true
                comments[index].likes++
            }

            renderComments()
        })
    }
}
