const classname = '.header'

const header = document.querySelector(classname)

export function init(){
  window.addEventListener('scroll', (event) => {
    const {
      scrollY
    } = window
    
    if (scrollY > 400) {
      header.classList.add('--scroll')
    } else {
      header.classList.remove('--scroll')
    }
  })
}