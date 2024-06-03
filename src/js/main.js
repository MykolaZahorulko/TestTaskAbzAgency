'use strict'
import {ibg} from './utils/ibg.js'
import {fetchData, postData} from './api/request.js'
import {formValidation} from "./api/formValidation.js";
import {checkingEmailValid} from "./components/checkingEmailValid.js";
import {goTo} from "./utils/ScrollToSection.js";

let allUsers = []
document.addEventListener('DOMContentLoaded', async () => {
    ibg()
    goTo()
    // Server Urls
    const initialUrl = `https://frontend-test-assignment-api.abz.agency/api/v1/users?page=1&count=6`
    let nextPageUrl = initialUrl
    // Email input and span elements for display valid effect
    const emailInput = document.querySelector('._email');
    const emailSpan = emailInput.nextElementSibling;

    // Users loading function call
    await loadUsers(nextPageUrl)

    // Button that load more users
    const loadMoreButton = document.querySelector('.get__button')
    loadMoreButton.addEventListener('click', async () => {
        if (nextPageUrl) {
            nextPageUrl = await loadUsers(nextPageUrl)
        }
    })

    // Form post method, and form validation function call
    const form = document.querySelector('.form')
    formValidation(form, emailSpan)

    // Checkig if email is valid and span is avalible allright
    checkingEmailValid(emailInput, emailSpan)

})

//Load more users Function
async function loadUsers(url) {
    const getContentBlock = document.querySelector('.get__content')
    getContentBlock.classList.add('_loading')
    const data = await fetchData(url)
    if (data && data.users) {
        allUsers = [...allUsers, ...data.users]
        displayUsers(data.users)
        getContentBlock.classList.remove('_loading')
        if (data.links.next_url) {
            document.querySelector('.get__button').style.display = 'flex'
            return data.links.next_url
        } else {
            document.querySelector('.get__button').style.display = 'none'
            return null
        }
    } else {
        document.querySelector('.get__button').style.display = 'none';
        return null;
    }
}

// Function that creates and displays more users
function displayUsers(users) {
    users.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    const usersContainer = document.querySelector('.get__content')

    users.forEach(user => {
        const userElement = document.createElement('div')
        userElement.className = 'get__user'
        userElement.innerHTML = `
            <div class="get__user-image img" >
                <img src="${user.photo}" alt="${user.name}">    
            </div>
            <div class="get__user-name" data-title="${user.name}">
                <span class="get__user-span">${user.name}
                <span class="get__user-popap">${user.name}</span>
                </span>
            </div>
            <div class="get__user-position" data-title="${user.position}">${user.position}</div>
            <div class="get__user-email" data-title="${user.email}">
                <span class="get__user-span">${user.email}
                <span class="get__user-popap">${user.email}</span>
                </span>
            </div>
            <div class="get__user-phone" data-title="${user.phone}">${user.phone}</div>
        `
        usersContainer.appendChild(userElement)
    })
}
