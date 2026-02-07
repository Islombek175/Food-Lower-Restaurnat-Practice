function openModal(modalContentselector, modalSelector, modalTimerId) {
	const modalContent = document.querySelector(modalContentselector),
		modal = document.querySelector(modalSelector)

	modal.classList.add('show')
	modal.classList.remove('hide')
	modalContent.classList.add('modal-fade')
	document.body.style.overflow = 'hidden'

	if (modalTimerId) {
		clearInterval(modalTimerId)
	}
}

function closeModal(modalSelector) {
	const modal = document.querySelector(modalSelector)

	modal.classList.add('hide')
	modal.classList.remove('show')
	document.body.style.overflow = ''
}

function modal(btnSelector, modalSelector, modalContentselector, modalTimerId) {
	const modalOpenBtns = document.querySelectorAll(btnSelector),
		modal = document.querySelector(modalSelector)

	modalOpenBtns.forEach(btn => {
		btn.addEventListener('click', () =>
			openModal(modalContentselector, modalSelector, modalTimerId),
		)
	})

	modal.addEventListener('click', event => {
		if (
			event.target === modal ||
			event.target.getAttribute('data-modal-close') === ''
		) {
			closeModal(modalSelector)
		}
	})

	document.addEventListener('keydown', event => {
		if (event.code == 'Escape' && modal.classList.contains('show')) {
			closeModal(modalSelector)
		}
	})
}

export default modal
export { closeModal, openModal }
