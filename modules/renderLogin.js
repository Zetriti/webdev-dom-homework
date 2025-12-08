/* eslint-disable prettier/prettier */
import { login, setName, setToken } from './comments.js'
import { fetchAndRenderComments } from '../index.js'
import { renderRegistration } from './renderRegistration.js'

export const renderLogin = () => {
    const container = document.querySelector('.container')

    const loginHtml = `
    <section class="add-form" style = "align-items: center;">
        <h1>Форма входа</h1>
        <input type="text" class="add-form-name" placeholder="Введите логин" id="login" required/>
        <input type="password" class="add-form-name" placeholder="Введите пароль" id="password" required style = "margin-top: 10px;"/>
        <fieldset class="add-form-registory" style = "margin-top: 10px;">
          <button class="add-form-button-main button-main  type="submit">Войти</button>
          <u class="add-form-button-link registry">Зарегестрироваться</u>
        </fieldset>
      </section>
    `
    container.innerHTML = loginHtml

    document.querySelector('.registry').addEventListener('click', () => {
        renderRegistration()
    })

    const loginEl = document.querySelector('#login')
    const passwordEl = document.querySelector('#password')
    const submitButtonEl = document.querySelector('.button-main')

    submitButtonEl.addEventListener('click', () => {
        login(loginEl.value, passwordEl.value)
            .then((response) => {
                if (!response.ok) {
                    if (response.status === 400) {
                        throw new Error('Неверный логин или пароль')
                    } else {
                        throw new Error('Ошибка сервера: ' + response.status)
                    }
                }
                return response.json()
            })
            .then((data) => {
                if (data.user && data.user.token) {
                    setToken(data.user.token)
                    setName(data.user.name)

                    fetchAndRenderComments()
                } else {
                    throw new Error('Неверный ответ от сервера')
                }
            })
            .catch((error) => {
                console.error('Ошибка входа:', error)
                alert(
                    error.message || 'Ошибка входа. Проверьте логин и пароль.',
                )
            })
    })
}
