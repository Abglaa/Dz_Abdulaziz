//MODAL

const footer = document.querySelector('.footer')
const modal = document.querySelector('.modal')
const modalTrigger = document.querySelector('#btn-get')
const closeModalBtn = document.querySelector('.modal_close')

const openModal = () => {
        modal.style.display = 'block'
        document.body.style.overflow = 'hidden'
}

const closeModal = () => {
        modal.style.display = 'none'
        document.body.style.overflow = ''
}

modalTrigger.onclick = () => openModal()
closeModalBtn.onclick = () => closeModal()
modal.onclick =  (event) => {
        if (event.target === modal || event.target === closeModalBtn) closeModal()
}

let modalOpened = false
hideModal = async () => {
    try {
        openModal()
        window.removeEventListener("scroll", footerScroll)
    } catch (e) {
        console.log(e)
    }
}

footerScroll = () => {
        if (window.scrollY + window.innerHeight >= footer.offsetTop) {
            autoModal()
        }
}

const autoModal = () => {
        if (!modalOpened) {
            modalOpened = true
            openModal()
            window.removeEventListener("scroll", footerScroll)
        }
}

window.addEventListener("scroll", footerScroll)
setTimeout(autoModal, 10000)