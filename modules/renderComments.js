import { comments } from './comments.js'
import { initLikeComments, initReplyСomment } from './initComment.js'

const commentsList = document.querySelector('.comments')

export const renderComments = () => {
    const commentsHtml = comments
        .map((comment, index) => {
            const likeButtonClass = comment.isLiked
                ? 'like-button -active-like'
                : 'like-button'

            return `<li class="comment" data-text="${comment.name}  писал(а):\n\u00AB${comment.text}\u00BB\n\nКомментарий:">
                    <div class="comment-header">
                        <div>${comment.name}</div>
                        <div>${comment.date}</div>
                    </div>
                    <div class="comment-body">
                        <div class="comment-text">
                            ${comment.text}
                        </div>
                    </div>
                    <div class="comment-footer">
                        <div class="likes">
                            <span class="likes-counter">${comment.likes}</span>
                            <button data-index="${index}" = class="${likeButtonClass}"></button>
                        </div>
                    </div>
                </li>`
        })
        .join('')

    commentsList.innerHTML = commentsHtml

    initLikeComments()
    initReplyСomment()
}
