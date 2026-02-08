'use strict'

import classCard from './modules/class.js'
import form from './modules/form.js'
import loader from './modules/loader.js'
import modal, { openModal } from './modules/modal.js'
import slider from './modules/slider.js'
import tabs from './modules/tabs.js'
import timer from './modules/timer.js'

window.addEventListener('DOMContentLoaded', () => {
	const modalTimerId = setTimeout(
		() => openModal('.modal__content', '.modal', modalTimerId),
		5000,
	)

	tabs('.tabheader__item', '.tabheader__items', '.tab_content')
	modal('[data-modal]', '.modal', '.modal__content', modalTimerId)
	loader()
	timer('2027-02-10', '.timer')
	classCard('.offers-items')
	form('form', modalTimerId)
	slider()
})