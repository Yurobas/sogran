import preloader from './js/preloader'
import { initHeader } from './js/header'
import Slider from './js/slider'
import initAnimations from './js/animateBlocks'
import { map } from './js/map.js'

import From from './js/form'

import { productTooltipInit } from './js/pop'

productTooltipInit()

preloader()
    .then(() => {
        Slider('.slider__container .swiper-container');
        initAnimations()
        initHeader()

        document.querySelectorAll('form').forEach(item => new From(item))
        map()

        fetch('http://u1273386.isp.regruhosting.ru/api/session-id.php', {
            method: 'GET',
            mode: "no-cors",
        })
        .then(response => console.log(response))
    })