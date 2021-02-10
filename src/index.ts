import preloader from './js/preloader'
import Slider from './js/slider'
import initAnimations from './js/animateBlocks'

import { productTooltipInit } from './js/pop'

productTooltipInit()

preloader()
    .then(() => {
        Slider('.slider__container');
        initAnimations()
    })