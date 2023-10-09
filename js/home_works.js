// home work 1 (part 1) gmail.com

const gmailInput = document.querySelector('#gmail_input')
const gmailButton = document.querySelector('#gmail_button')
const gmailResult = document.querySelector('#gmail_result')

const regExp = /^[a-zA-Z0-9._%+-]+([a-zA-Z]@gmail.com)$/

const maxWorlds = 30;
const minWorlds = 6;

gmailButton.onclick = () => {
    if(regExp.test(gmailInput.value)){
        gmailResult.innerHTML = 'everything is correct'
        gmailResult.style.color = 'green'
    } else {
        gmailResult.innerHTML = 'not correct, here is an example example@gmail.com'
        gmailResult.style.color = 'red'
    }
}

const child_block = document.querySelector(".child_block")

let posX = 0
let posY = 0

function moveBlock () {
    if (posX <= 445 && posY === 0) {
        posX +=8
        child_block.style.left = `${posX}px`

        setTimeout(moveBlock, 50)
    } else {
        child_block.style.backgroundColor = "green"
        console.log("Здравсвтуйте Нурдин")
    }
}

requestAnimationFrame(moveBlock)