'use strict'
import {ibg} from './utils/ibg.js'
import {fetchData} from './api/fetch.js'

ibg()

document.addEventListener('DOMContentLoaded', async () => {
    const initialUrl = `https://frontend-test-assignment-api.abz.agency/api/v1/users?page=1&count=6`
    let nextPageUrl = initialUrl

    await loadUsers(nextPageUrl)

    const loadMoreButton = document.querySelector('.get__button')
    loadMoreButton.addEventListener('click', async () => {
        if (nextPageUrl) {
            nextPageUrl = await loadUsers(nextPageUrl)
        }
    })
})

async function loadUsers(url) {
    const data = await fetchData(url)
    if (data && data.users) {
        displayUsers(data.users)
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

function displayUsers(users) {
    const usersContainer = document.querySelector('.get__content')

    users.forEach(user => {
        const userElement = document.createElement('div')
        userElement.className = 'get__user'
        userElement.innerHTML = `
            <div class="get__user-image img">
                <img src="${user.photo}" alt="${user.name}">    
            </div>
            <div class="get__user-name">${user.name}</div>
            <div class="get__user-position">${user.position}</div>
            <div class="get__user-email">${user.email}</div>
            <div class="get__user-phone">${user.phone}</div>
        `
        usersContainer.appendChild(userElement)
    })
}
