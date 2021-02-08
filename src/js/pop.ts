import {clickOutside} from './globalListeners'

export function productTooltipInit() {
  const items = document.querySelectorAll('.productTooltip')

  const classes = ['--left', '--right']

  items.forEach((item) => {
    // @ts-ignore
    clickOutside(item, () => {
      (item as HTMLElement).classList.remove('--active')
    })
    item
      .querySelector('.productTooltip__icon')
      .addEventListener('click', event => {
        const node = event.currentTarget as HTMLElement

        const block = item.querySelector('.productTooltip__info') as HTMLElement
        if (!item.classList.contains('--active')) {
          Object.assign(block.style, {
            opacity: 0,
            transition: 'none',
          })
          item.classList.add('--active')
  
          const {
            right,
            left,
            width,
          } = block.getBoundingClientRect()

          const {
            documentElement: {
              clientWidth
            }
          } = document
          
          if (clientWidth - right < 30) {
            item.classList.remove('--right')
            item.classList.add('--left')
          } else if (left < 30) {
            item.classList.add('--right')
            item.classList.remove('--left')
          }

          item.classList.remove('--active')
        }
        
        requestAnimationFrame(() => requestAnimationFrame(() => {
          Object.assign(block.style, {
            opacity: '',
            transition: '',
          })
          item.classList.toggle('--active')
        }))

      })
  })
}