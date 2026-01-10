window.addEventListener('DOMContentLoaded', () => {
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
})
