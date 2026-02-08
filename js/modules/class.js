import getResources from '../services/get-resources'

function classCard(selector) {
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

	getResources().then(data => {
		data.forEach(offer => {
			const { src, alt, title, description, discount, price } = offer

			new offerMenu(
				src,
				alt,
				title,
				description,
				discount,
				price,
				selector,
			).render()
		})
	})
}
export default classCard
