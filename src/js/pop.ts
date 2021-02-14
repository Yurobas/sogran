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
        const block = item.querySelector('.productTooltip__info') as HTMLElement

        if (!item.classList.contains('--active')) {
          Object.assign(block.style, {
            opacity: 0,
            transition: 'none',
          })
          item.classList.add('--active')

          const priority = ['--right', '--right-advanced', '--left', '--left-advanced', '--center']
          let oldClassName = ''
          for (let i = 0; i < priority.length; i++) {
            const className = priority[i];
            
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
            if (clientWidth - right < 30 || left < 30) {
              oldClassName && item.classList.remove(oldClassName)
              item.classList.add(className)
              oldClassName = className
            }
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