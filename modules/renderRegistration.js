/* eslint-disable prettier/prettier */
import { registration, setName, setToken } from './comments.js'
import { fetchAndRenderComments } from '../index.js'
import { renderLogin } from './renderLogin.js'

export const renderRegistration = () => {
    const container = document.querySelector('.container')

    const loginHtml = `
    <section class="add-form" style = "align-items: center;">
        <h1>Форма регистрации</h1>
        <input type="text" class="add-form-name" placeholder="Введите Имя" id="name" required/>
        <input type="text" class="add-form-name" placeholder="Введите логин" id="login" required style = "margin-top: 10px;"/>
        <input type="password" class="add-form-name" placeholder="Введите пароль" id="password" required style = "margin-top: 10px;"/>
        <fieldset class="add-form-registory" style = "margin-top: 10px;">
          <button class="add-form-button-main button-main  type="submit">Зарегестрироваться</button>
          <u class="add-form-button-link entry">Войти</u>
        </fieldset>
      </section>
    `
    container.innerHTML = loginHtml

    document.querySelector('.entry').addEventListener('click', () => {
        renderLogin()
    })

    const nameEl = document.querySelector('#name')
    const loginEl = document.querySelector('#login')
    const passwordEl = document.querySelector('#password')
    const submitButtonEl = document.querySelector('.button-main')

    submitButtonEl.addEventListener('click', () => {
        registration(nameEl.value, loginEl.value, passwordEl.value)
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
