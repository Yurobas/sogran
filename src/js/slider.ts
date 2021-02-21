import Swiper, { Navigation, Pagination } from 'swiper'
import 'swiper/swiper-bundle.css';

Swiper.use([Navigation, Pagination])

export default (className = '.slider__swiper') => {
  const info = document.querySelector('.slider__list')
  const infos = [...document.querySelectorAll('.slider__info')]
  const slider = new Swiper(className, {
    speed: 700,
    loop: true,
    navigation: {
      nextEl: '.slider__arrow.--right',
      prevEl: '.slider__arrow.--left'
    },
    on: {
      init: function() {
        const current = this.realIndex
        activeInfo(current)
      }
    }
  })

  slider.on('slideChange', () => {
    const current = slider.realIndex
    activeInfo(current)
  })

  function activeInfo(current) {
    infos.forEach((item, index) => {
      item.classList.remove('--active')
      if (index === current) {
        const height = item.getBoundingClientRect().height
        info.style.height = height + 'px'
        item.classList.add('--active')
      }
    })
  }

  //  slider.on('slideChangeTransitionStart', () => {
  //   slider.el.closest('.portfolio')?.classList.add('--remove')
  //   slider.el.closest('.portfolio')?.classList.remove('--add')

  //   setTimeout(() => {
  //     slider.el.closest<HTMLElement>('.portfolio').dataset.index = slider.activeIndex.toString()
  //     setTimeout(() => {
  //       slider.el.closest('.portfolio')?.classList.add('--add')
  //       slider.el.closest('.portfolio')?.classList.remove('--remove')
  //     });
  //   }, 500);
  //  })

}