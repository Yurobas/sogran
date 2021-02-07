import preloader from './js/preloader'
import Slider from './js/slider'
import initAnimations from './js/animateBlocks'

new Slider('.slider__container');
import { productTooltipInit } from './js/pop'

productTooltipInit()

preloader()
    .then(() => {
        initAnimations()
    })