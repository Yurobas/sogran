
export function productTooltipInit() {
  const items = document.querySelectorAll('.productTooltip')

  items.forEach(item => {
    item
      .querySelector('.productTooltip__icon')
      .addEventListener('click', event => {
        const node = event.currentTarget as HTMLElement

        item.classList.toggle('--active')

        node.getBoundingClientRect()
      })
  })
}