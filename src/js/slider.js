import Swiper, { Navigation } from 'swiper'
import 'swiper/swiper-bundle.css';

Swiper.use(Navigation)

export default (className = '.slider__swiper') => {
  const slider = new Swiper(className, {
    loop: true,
    navigation: {
      nextEl: '.slider__arrow.--left',
      prevEl: '.slider__arrow.--right'
    }
  })
}