import { renderComments } from './renderComments.js'
import { fetchComments } from './comments.js'
import { host } from './comments.js'
import { token } from './comments.js'

function clearForm() {
    const nameInput = document.querySelector('.add-form-name')
    const textInput = document.querySelector('.add-form-text')
    if (nameInput && textInput) {
        nameInput.value = ''
        textInput.value = ''
    }
}

function loadingComments(loading) {
    const addForm = document.querySelector('.add-form')
    if (!addForm) return

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
        if (uploadingComment) {
            uploadingComment.remove()
        }
    }
}

function sendCommentToServer() {
    const nameInput = document.querySelector('.add-form-name')
    const textInput = document.querySelector('.add-form-text')

    if (!nameInput || !textInput) {
        console.error('Элементы формы не найдены')
        return
    }

    const name = escapeHtml(nameInput.value)
    const text = escapeHtml(textInput.value)

    const newComment = {
        text: text,
        name: name,
    }

    loadingComments(true)

    fetch(host + '/comments', {
        method: 'POST',
        body: JSON.stringify(newComment),
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
        .then((response) => {
            if (!response.ok) {
                if (response.status === 401) {
                    throw new Error('Нет авторизации')
                } else if (response.status === 400) {
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
function escapeHtml(text) {
    return text
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#039;')
}

export function initCommentHandlers() {
    const addButton = document.querySelector('.add-form-button')
    const textInput = document.querySelector('.add-form-text')

    if (!addButton || !textInput) {
        console.error(
            'Элементы формы не найдены для инициализации обработчиков',
        )
        return
    }
    addButton.addEventListener('click', sendCommentToServer)

    textInput.addEventListener('keydown', function (event) {
        if (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) {
            sendCommentToServer()
        }
    })
}

console.log('It works!')
