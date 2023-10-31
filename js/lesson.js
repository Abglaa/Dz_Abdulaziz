//PHONE CHECKER

const phoneInput = document.querySelector('#phone_input')
const phoneButton = document.querySelector('#phone_button')
const phoneResult = document.querySelector('#phone_result')

const regExp = /^\+996 [2579]\d{2} \d{2}-\d{2}-\d{2}$/

phoneButton.addEventListener('click',  () => {
        if (regExp.test(phoneInput.value)) {
            phoneResult.innerHTML = 'OK'
            phoneResult.style.color = 'green'
        } else {
            phoneResult.innerHTML = 'NOT OK'
            phoneResult.style.color = 'red'
        }
})

// Tab slider

const tabContentBLocks = document.querySelectorAll('.tab_content_block')
const tabsItems = document.querySelectorAll('.tab_content_item')
const parentTabs = document.querySelector('.tab_content_items')


const hideTabContent = () =>{
    tabContentBLocks.forEach((tabContentBlock) =>{
        tabContentBlock.style.display = 'none'
    })
    tabsItems.forEach((tabItem)=>{
        tabItem.classList.remove('tab_content_item_active')
    })
}
const showTabContent = (indexElement = 0) =>{
    tabContentBLocks[indexElement].style.display = 'block'
    tabsItems[indexElement].classList.add('tab_content_item_active')
}
parentTabs.onclick = (event) =>{
    if(event.target.classList.contains('tab_content_item')){
        tabsItems.forEach((tabItem,tabIndex) =>{
            if(event.target === tabItem){
                hideTabContent()
                showTabContent(tabIndex)
            }
        })
    }
}
const autoTabContentSlide = (i = 0) => {
    setInterval(() => {
        i++
        if (i > tabContentBLocks.length - 1) {
            i = 0
        }
        hideTabContent()
        showTabContent(i)
    }, 3000)
}
autoTabContentSlide()
hideTabContent()
showTabContent()

//CONVERTOR

const somInput = document.querySelector('#som')
const usdInput = document.querySelector('#usd')
const eurInput = document.querySelector('#eur')

const converterChanges = (elementValue, targetElement, isTrue) => {
    elementValue.oninput = () => {
        const request = new XMLHttpRequest()
        request.open("GET", "../data/convertor.json")
        request.setRequestHeader("Content-Type", "application/json")
        request.send()

        request.onload = () => {
            if (request.status === 200) {
                const response = JSON.parse(request.responseText)
                if (isTrue === 'som') {
                    targetElement.value = (elementValue.value / response.usd).toFixed(2)
                    eurInput.value = (elementValue.value / response.eur).toFixed(2)
                } else if (isTrue === 'usd') {
                    targetElement.value = (elementValue.value * response.usd).toFixed(2)
                    eurInput.value = (elementValue.value * response.usd / response.eur).toFixed(2)
                } else if (isTrue === 'eur') {
                    targetElement.value = (elementValue.value * response.eur).toFixed(2)
                    usdInput.value = (elementValue.value * response.eur / response.usd).toFixed(2)
                }
                if (elementValue.value === ''|| targetElement.value === '0') {
                    eurInput.value = '';
                    usdInput.value = '';
                }
            }
        }
    }
}

converterChanges(somInput, usdInput, 'som')
converterChanges(usdInput, somInput, 'usd')
converterChanges(eurInput, somInput, 'eur')


//CARD SWITCHER

const card = document.querySelector('.card')
const btnNext = document.querySelector('#btn-next')
const btnPrev = document.querySelector('#btn-prev')
let count = 1

const switcher = async () => {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${count}`)
        const data = await response.json()
        card.innerHTML = `
                <p>${data.title}</p>
                <p style="color:${data.completed ? 'green' : 'red'}">${data.completed}</p>
                <span>${data.id}</span>
                `
    } catch (e){
        console.log(e)
    }

}
switcher()

let next = ()=> {
    if (count === 200) {
        count = 1
    } else {
        count++
    }
    switcher()
}
let prev = ()=> {
    if (count === 1) {
        count = 200
    } else {
        count--
    }
    switcher()
}
btnNext.onclick = next
btnPrev.onclick = prev
const fetchConsole = async () => {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts`)
        const data = await response.json()
        console.log(data)
    } catch (e) {
        alert(`Error: ${e.message }`)
    }
}
fetchConsole()

//DZ6-2  Так же сделать отдельный fetch запрос на эту ссылку: 'https://jsonplaceholder.typicode.com/posts' и отобразить данные просто в консоли

// fetch('https://jsonplaceholder.typicode.com/posts')
//     .then(response => response.json())
//     .then(json => console.log(json))

// fetch('https://jsonplaceholder.typicode.com/posts')
//     .then(response => response.json())
//     .then(data => console.table(data))

const cityNameInput = document.querySelector('.cityName')
const city = document.querySelector('.city')
const temp = document.querySelector('.temp')
const btnSearch = document.querySelector('#search-btn')
const API_KEY = 'e417df62e04d3b1b111abeab19cea714'
const BASE_URL = 'http://api.openweathermap.org/data/2.5/weather'

const citySearch = () => {
    cityNameInput.oninput = async (event) => {
        try {
            const response = await fetch(`${BASE_URL}?q=${event.target.value}&appid=${API_KEY}`)
            const data = await response.json()
            city.innerHTML = data.name ? data.name : 'Город не найден...'
            temp.innerHTML = data?.main?.temp ? Math.round(data?.main?.temp - 273) + '&deg;C' : '...'
        } catch (e) {
            alert(`Error: ${e.message }`)
        }
    }
}

citySearch()