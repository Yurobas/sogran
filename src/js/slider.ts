import Swiper, { Navigation, Pagination } from 'swiper'
import 'swiper/swiper-bundle.css';

 Swiper.use([Navigation, Pagination])

 export default (className = '.slider__swiper') => {
   const slider = new Swiper(className, {
     loop: true,
     navigation: {
       nextEl: '.slider__arrow.--right',
       prevEl: '.slider__arrow.--left'
     },
   })

   slider.on('slideChangeTransitionStart', () => {
    slider.el.closest('.portfolio')?.classList.add('--remove')
    slider.el.closest('.portfolio')?.classList.remove('--add')

    setTimeout(() => {
      slider.el.closest<HTMLElement>('.portfolio').dataset.index = slider.activeIndex.toString()
      setTimeout(() => {
        slider.el.closest('.portfolio')?.classList.add('--add')
        slider.el.closest('.portfolio')?.classList.remove('--remove')
      });
    }, 500);
   })

}