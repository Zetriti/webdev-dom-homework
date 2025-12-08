import { comments } from './comments.js'
import { initLikeComments, initReplyСomment } from './initComment.js'
import { formatDate } from './formatDate.js'
import { renderLogin } from './renderLogin.js'
import { token } from './comments.js'
import { initCommentHandlers } from './addComment.js'
import { name } from './comments.js'

const container = document.querySelector('.container')

export const renderComments = () => {
    const commentsHtml = comments

        .map((comment) => {
            const likeButtonClass = comment.isLiked
                ? 'like-button -active-like'
                : 'like-button'
            const formattedDate = formatDate(comment.date)
            const commentId = comment.id
            return `<li class="comment" data-text="${comment.author.name}  писал(а):\n\u00AB${comment.text}\u00BB\n\nКомментарий:">
                    <div class="comment-header">
                        <div>${comment.author.name}</div>
                        <div>${formattedDate}</div>
                    </div>
                    <div class="comment-body">
                        <div class="comment-text">
                            ${comment.text}
                        </div>
                    </div>
                    <div class="comment-footer">
                        <div class="likes">
                            <span class="likes-counter">${comment.likes}</span>
                            <button data-id="${commentId}" class="${likeButtonClass}"></button>
                        </div>
                    </div>
                </li>`
        })
        .join('')

    const addCommentsHtml = `
      <div class="add-form">
        <input type="text" class="add-form-name" readonly value="${name}"placeholder="Введите ваше имя"/>
        <textarea type="textarea" class="add-form-text" placeholder="Введите ваш коментарий" rows="4"></textarea>
        <div class="add-form-row">
          <button class="add-form-button">Написать</button>
        </div>
      </div>`

    const linkToLoginText = `<p>Чтобы отправить комментарий, <span class = "link-login">войдите</span></p>`

    const baseHtml = `
    <ul class ="comments">${commentsHtml}</ul>
    ${token ? addCommentsHtml : linkToLoginText}
    `
    container.innerHTML = baseHtml

    if (token) {
        initLikeComments()
        initReplyСomment()
        initCommentHandlers()
    } else {
        document.querySelector('.link-login').addEventListener('click', () => {
            renderLogin()
        })
    }
}
