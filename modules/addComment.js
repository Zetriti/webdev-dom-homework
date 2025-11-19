import { formatDate } from './formatDate.js'
import { comments } from './comments.js'
import { renderComments } from './renderComments.js'

const addButton = document.querySelector('.add-form-button')
const nameInput = document.querySelector('.add-form-name')
const textInput = document.querySelector('.add-form-text')

function clearForm() {
    nameInput.value = ''
    textInput.value = ''
}

function isFormValid() {
    const name = nameInput.value
    const text = textInput.value

    return name.trim() !== '' && text.trim() !== ''
}

function escapeHtml(text) {
    return text
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#039;')
}

function addComment() {
    if (!isFormValid()) {
        alert('Пожалуйста, заполните все поля')
        return
    }

    const name = escapeHtml(nameInput.value)
    const text = escapeHtml(textInput.value)
    const currentDate = new Date()
    const dateString = formatDate(currentDate)
    comments.push({
        name: name,
        date: dateString,
        text: text,
        likes: 0,
        isLiked: false,
    })
    renderComments()
    clearForm()
}

export function sendСomment() {
    addButton.addEventListener('click', addComment)

    textInput.addEventListener('keydown', function (event) {
        if (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) {
            addComment()
        }
    })
}
sendСomment()

console.log('It works!')
