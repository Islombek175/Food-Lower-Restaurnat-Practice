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
		modalCloseBtn = document.querySelector('[data-modal-close]'),
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

	modalCloseBtn.addEventListener('click', closeModal)

	modal.addEventListener('click', event => {
		if (event.target === modal) {
			closeModal()
		}
	})

	document.addEventListener('keydown', event => {
		if (event.code == 'Escape' && modal.classList.contains('show')) {
			closeModal()
		}
	})

	const modalTimerId = setTimeout(openModal, 5000)
})
