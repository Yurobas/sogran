const header = document.querySelector('.header')
const height = header.getBoundingClientRect().height
const wrapper = document.querySelector('.wrapper')

export function initHeader() {
  wrapper.addEventListener('scroll', (event) => {
    const {
      scrollTop
    } = wrapper

    if (scrollTop > height) {
      header.classList.add('--hide')
      wrapper.style.paddingTop = `${height}px`
    } else {
      header.classList.remove('--hide')
      wrapper.style.paddingTop = '';
    }

    if (scrollTop > 400) {
      header.classList.add('--scroll')
    } else {
      header.classList.remove('--scroll')
    }
  })
}