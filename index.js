import { renderComments } from './modules/renderComments.js'
import { initCommentHandlers } from './modules/addComment.js'
import { fetchComments } from './modules/comments.js'

fetchComments().then(() => {
    renderComments()
})

initCommentHandlers()
