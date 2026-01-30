'use strict'

window.addEventListener('DOMContentLoaded', () => {
	// Tabs

	const tabs = document.querySelectorAll('.tabheader__item'),
		tabsParent = document.querySelector('.tabheader__items'),
		tabContents = document.querySelectorAll('.tab_content')

	function hideTabs() {
		tabContents.forEach(content => {
			content.classList.add('hide')
			content.classList.remove('show')
		})

		tabs.forEach(tab => {
			tab.classList.remove('tabheader__item_active')
		})
	}

	function showTabContent(index) {
		tabs[index].classList.add('tabheader__item_active')
		tabContents[index].classList.add('show', 'fade')
		tabContents[index].classList.remove('hide')
	}

	tabsParent.addEventListener('click', event => {
		const target = event.target

		if (target && target.classList.contains('tabheader__item')) {
			tabs.forEach((tab, index) => {
				if (target === tab) {
					hideTabs()
					showTabContent(index)
				}
			})
		}
	})

	hideTabs()

	//  Loader
	const loaderWrapper = document.querySelector('.loader-wrapper')

	setTimeout(() => {
		loaderWrapper.style.display = 'none'
	}, 2000)

	// Timer
	const deadline = '2026-02-10'

	function formatNumber(number) {
		if (number >= 0 && number < 10) {
			return `0${number}`
		} else {
			return number
		}
	}

	function getTimeRemaining(endTime) {
		let days, hours, minutes, seconds
		const time = Date.parse(endTime) - Date.parse(new Date('2028-01-01'))

		if (time <= 0) {
			days = 0
			hours = 0
			minutes = 0
			seconds = 0
		} else {
			;((days = Math.floor(time / (1000 * 60 * 60 * 24))),
				(hours = Math.floor((time / (1000 * 60 * 60)) % 24)),
				(minutes = Math.floor((time / 60000) % 60)),
				(seconds = Math.floor((time / 1000) % 60)))
		}

		return {
			totalTime: time,
			days,
			hours,
			minutes,
			seconds,
		}
	}

	function setClock(selector, endTime) {
		const timer = document.querySelector(selector),
			days = timer.querySelector('#days'),
			hours = timer.querySelector('#hours'),
			minutes = timer.querySelector('#minutes'),
			seconds = timer.querySelector('#seconds'),
			timeInterval = setInterval(updateClock, 1000)

		updateClock()

		function updateClock() {
			const time = getTimeRemaining(endTime)

			days.textContent = formatNumber(time.days)
			hours.textContent = formatNumber(time.hours)
			minutes.textContent = formatNumber(time.minutes)
			seconds.textContent = formatNumber(time.seconds)

			if (time.totalTime <= 0) {
				clearInterval(timeInterval)
			}
		}
	}

	setClock('.timer', deadline)

	// Modal
	const modalOpenBtns = document.querySelectorAll('[data-modal]'),
		modal = document.querySelector('.modal'),
		modalContent = document.querySelector('.modal__content')

	function openModal() {
		modal.classList.add('show')
		modal.classList.remove('hide')
		modalContent.classList.add('modal-fade')
		document.body.style.overflow = 'hidden'
		clearInterval(modalTimerId)
	}

	function closeModal() {
		modal.classList.add('hide')
		modal.classList.remove('show')
		document.body.style.overflow = ''
	}

	modalOpenBtns.forEach(btn => {
		btn.addEventListener('click', openModal)
	})

	modal.addEventListener('click', event => {
		if (
			event.target === modal ||
			event.target.getAttribute('data-modal-close') === ''
		) {
			closeModal()
		}
	})

	document.addEventListener('keydown', event => {
		if (event.code == 'Escape' && modal.classList.contains('show')) {
			closeModal()
		}
	})

	const modalTimerId = setTimeout(openModal, 5000)

	// Class

	class offerMenu {
		constructor(
			imageSrc,
			imageAlt,
			title,
			description,
			discount,
			price,
			parentSelector,
		) {
			this.imageSrc = imageSrc
			this.imageAlt = imageAlt
			this.title = title
			this.description = description
			this.discount = discount
			this.price = price
			this.parent = document.querySelector(parentSelector)
			this.formatToUSD()
		}

		formatToUSD() {
			this.discount = this.discount.toLocaleString('en-US', {
				style: 'currency',
				currency: 'USD',
			})
			this.price = this.price.toLocaleString('en-US', {
				style: 'currency',
				currency: 'USD',
			})
		}

		render() {
			const element = document.createElement('div')

			element.innerHTML = `
			<div>
        <img src=${this.imageSrc} alt="${this.imageAlt}">
          <div>
            <h3>${this.title}</h3>
            <p>${this.description}</p>
            <p><del>${this.discount}</del> <span class="primary-text">${this.price}</span></p>
          </div>
      </div>`

			this.parent.append(element)
		}
	}

	fetch('http://localhost:3000/offers', {
		method: 'GET',
		headers: { 'Content-type': 'application/json' },
	}).then(response =>
		response.json().then(data => {
			data.forEach(offer => {
				const { src, alt, title, description, discount, price } = offer

				new offerMenu(
					src,
					alt,
					title,
					description,
					discount,
					price,
					'.offers-items',
				).render()
			})
		}),
	)

	// FORM
	const form = document.querySelector('form'),
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
		openModal()

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
			closeModal()
		}, 4000)
	}

	// Slider
	const slides = document.querySelectorAll('.offer__slide'),
		prev = document.querySelector('.offer__slider-prev'),
		next = document.querySelector('.offer__slider-next'),
		total = document.querySelector('#total'),
		current = document.querySelector('#current'),
		slidesWrapper = document.querySelector('.offer__slider-wrapper'),
		slidesInner = document.querySelector('.offer__slider-inner'),
		width = window.getComputedStyle(slidesWrapper).width

	slidesInner.style.width = 100 * slides.length + '%'
	slidesInner.style.display = 'flex'
	slidesInner.style.transition = 'all 0.5s ease'

	slidesWrapper.style.overflow = 'hidden'

	let slideIndex = 1,
		offset = 0

	if (slides.length < 10) {
		total.textContent = `0${slides.length}`
		current.textContent = `0${slideIndex}`
	} else {
		total.textContent = slides.length
		current.textContent = slideIndex
	}

	slides.forEach(item => (item.style.width = width))

	next.addEventListener('click', () => {
		if (offset === +width.slice(0, width.length - 2) * (slides.length - 1)) {
			offset = 0
		} else {
			offset += +width.slice(0, width.length - 2)
		}
		slidesInner.style.transform = `translateX(-${offset}px)`

		if (slideIndex === slides.length) {
			slideIndex = 1
		} else {
			slideIndex++
		}

		if (slides.length < 10) {
			current.textContent = `0${slideIndex}`
		} else {
			current.textContent = slideIndex
		}
	})

	prev.addEventListener('click', () => {
		if (offset === 0) {
			offset = +width.slice(0, width.length - 2) * (slides.length - 1)
		} else {
			offset -= +width.slice(0, width.length - 2)
		}
		slidesInner.style.transform = `translateX(-${offset}px)`

		if (slideIndex === 1) {
			slideIndex = slides.length
		} else {
			slideIndex--
		}

		if (slides.length < 10) {
			current.textContent = `0${slideIndex}`
		} else {
			current.textContent = slideIndex
		}
	})
})
