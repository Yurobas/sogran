import preloader from './js/preloader'
import { initHeader } from './js/header'
import Slider from './js/slider'
import initAnimations from './js/animateBlocks'

new Slider('.slider__container');
import { productTooltipInit } from './js/pop'

productTooltipInit()

preloader()
    .then(() => {
        initAnimations()
        initHeader()
    })