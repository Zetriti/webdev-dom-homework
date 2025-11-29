import { renderComments } from './modules/renderComments.js'
import { initCommentHandlers } from './modules/addComment.js'
import { fetchComments } from './modules/comments.js'

const commentsList = document.querySelector('.comments')

function showLoadingIndicator() {
    commentsList.innerHTML = `
        <div class="loading-indicator">
            <p>Пожалуйста подождите, загружаю комментарии...</p>
        </div>
    `
}

function hideLoadingIndicator() {
    const loadingIndicator = document.querySelector('.loading-indicator')
    if (loadingIndicator) {
        loadingIndicator.remove()
    }
}

showLoadingIndicator()

fetchComments().then(() => {
    renderComments()
    hideLoadingIndicator()
})

initCommentHandlers()
