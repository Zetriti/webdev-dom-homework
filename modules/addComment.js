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

function isFormValid() {
    const name = nameInput.value.trim()
    const text = textInput.value.trim()
    return name.length >= 3 && text.length >= 3
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
    if (!isFormValid()) {
        alert('Имя и комментарий должны содержать хотя бы 3 символа')
        return
    }

    const name = escapeHtml(nameInput.value)
    const text = escapeHtml(textInput.value)

    const newComment = {
        text: text,
        name: name,
    }

    loadingComments(true)

    fetch('https://wedev-api.sky.pro/api/v1/dmitry-gerasimov/comments', {
        method: 'POST',
        body: JSON.stringify(newComment),
    })
        .then((response) => {
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
