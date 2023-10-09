// home work 1 (part 1) gmail.com
//

const gmailInput = document.querySelector('#gmail_input');
const gmailButton = document.querySelector('#gmail_button');
const gmailResult = document.querySelector('#gmail_result');

const regExp = /^[a-zA-Z0-9._%+-]+@gmail.com$/;

const maxChars = 30;
const minChars = 6;

gmailButton.onclick = () => {
    const inputText = gmailInput.value;
    if (inputText.length >= minChars && inputText.length <= maxChars && regExp.test(inputText)) {
        gmailResult.innerHTML = 'Все верно: правильный адрес Gmail';
        gmailResult.style.color = 'green';
    } else {
        gmailResult.innerHTML = 'Неверный адрес, пример: example@gmail.com, от 6 до 30 символов';
        gmailResult.style.color = 'red';
    }
};


//home work 1 (part 2)

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