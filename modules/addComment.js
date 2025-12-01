import { renderComments } from './renderComments.js'
import { fetchComments } from './comments.js'

const addForm = document.querySelector('.add-form')
const addButton = document.querySelector('.add-form-button')
const nameInput = document.querySelector('.add-form-name')
const textInput = document.querySelector('.add-form-text')

function clearForm() {
    nameInput.value = ''
    textInput.value = ''
}

function escapeHtml(text) {
    return text
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#039;')
}

function loadingComments(loading) {
    if (loading) {
        addForm.style.display = 'none'
        const uploadingComment = document.createElement('div')
        uploadingComment.id = 'uploadingNewComment'
        uploadingComment.innerHTML = ` 
        <div class="uploadingText">
            <p>Комментарий добавляется...</p>
        </div> `
        addForm.parentNode.insertBefore(uploadingComment, addForm.nextSibling)
    } else {
        addForm.style.display = 'flex'
        const uploadingComment = document.getElementById('uploadingNewComment')
        uploadingComment.remove()
    }
}

function sendCommentToServer() {
    const name = escapeHtml(nameInput.value)
    const text = escapeHtml(textInput.value)

    const newComment = {
        text: text,
        name: name,
        forceError: true,
    }

    loadingComments(true)

    fetch('https://wedev-api.sky.pro/api/v1/dmitry-gerasimov/comments', {
        method: 'POST',
        body: JSON.stringify(newComment),
    })
        .then((response) => {
            if (!response.ok) {
                if (response.status === 400) {
                    return response.json().then((errorData) => {
                        throw new Error(
                            errorData.error || 'Некорректные данные',
                        )
                    })
                } else if (response.status === 500) {
                    throw new Error('Сервер сломался, попробуй позже')
                } else {
                    throw new Error('Ошибка сервера: ' + response.status)
                }
            }
            return response.json()
        })
        .then(() => {
            return fetchComments()
        })
        .then(() => {
            renderComments()
            clearForm()
            loadingComments(false)
        })
        .catch((error) => {
            if (error.message === 'Сервер сломался, попробуй позже') {
                alert('Сервер сломался, попробуй позже')
                setTimeout(sendCommentToServer, 0)
                return
            } else if (
                error.name === 'TypeError' &&
                error.message === 'Failed to fetch'
            ) {
                alert('Кажется, у вас сломался интернет, попробуйте позже')
            } else {
                alert(error.message || 'Ошибка при отправке комментария')
            }
        })
        .finally(() => {
            loadingComments(false)
        })
}

export function initCommentHandlers() {
    addButton.addEventListener('click', sendCommentToServer)

    textInput.addEventListener('keydown', function (event) {
        if (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) {
            sendCommentToServer()
        }
    })
}

console.log('It works!')
