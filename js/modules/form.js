import { closeModal, openModal } from './modal'

function form(formSelector, modalTimerId) {
	const form = document.querySelector(formSelector),
		telegramBotToken = '8415822897:AAHoX0oqmXAXdOj6wK0r1abujsgDy8DwI-U',
		chatId = '6480933576'

	const message = {
		loading: 'Loading...',
		success: 'Thanks for contacting us!',
		failure: 'Something went wrong...',
	}

	form.addEventListener('submit', event => {
		event.preventDefault()

		const loader = document.createElement('div')
		loader.classList.add('loader')
		loader.style.width = '20px'
		loader.style.height = '20px'
		loader.style.marginTop = '20px'
		form.append(loader)

		const formData = new FormData(form)

		const object = {}
		formData.forEach((value, key) => {
			object[key] = value
		})

		// -----SENDING MESSAGE TO TGBOT
		fetch(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`, {
			method: 'POST',
			headers: {
				'Content-type': 'application/json',
			},
			body: JSON.stringify({
				chat_id: chatId,
				text: `
				Name: ${object.name}, Phone: ${object.phone}`,
			}),
		})
			.then(() => {
				showStatusMessage(message.success)
				form.reset()
			})
			.catch(() => {
				showStatusMessage(message.failure)
			})
			.finally(() => {
				setTimeout(() => {
					loader.remove()
				}, 2000)
			})
	})

	function showStatusMessage(message) {
		const modalDialog = document.querySelector('.modal__dialog')

		modalDialog.classList.add('hide')
		openModal('.modal__content', '.modal', modalTimerId)

		const statusModal = document.createElement('div')
		statusModal.classList.add('modal__dialog')
		statusModal.innerHTML = `
		<div class="modal__content">
			<div data-modal-close class="modal__close">&times;</div>
			<div class="modal__title">
            ${message}
      </div>
		</div>
		`

		document.querySelector('.modal').append(statusModal)

		setTimeout(() => {
			statusModal.remove()
			modalDialog.classList.add('show')
			modalDialog.classList.remove('hide')
			closeModal(modalSelector)
		}, 4000)
	}
}

export default form
