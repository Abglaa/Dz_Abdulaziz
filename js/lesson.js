//PHONE CHECKER

const phoneInput = document.querySelector('#phone_input')
const phoneButton = document.querySelector('#phone_button')
const phoneResult = document.querySelector('#phone_result')

const regExp = /^\+996 [2579]\d{2} \d{2}-\d{2}-\d{2}$/

phoneButton.addEventListener('click', () => {
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
