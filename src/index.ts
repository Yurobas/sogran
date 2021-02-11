import preloader from './js/preloader'
import { initHeader } from './js/header'
import Slider from './js/slider'
import initAnimations from './js/animateBlocks'

import { productTooltipInit } from './js/pop'

productTooltipInit()

preloader()
    .then(() => {
        Slider('.slider__container .swiper-container');
        initAnimations()
        initHeader()
    })