import preloader from './js/preloader'
import Slider from './js/slider'

new Slider('.slider__container');

preloader()
    .then(() => {
      console.log('done');
      
    })