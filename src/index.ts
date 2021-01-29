import preloader from './js/preloader'
import slider from './js/slider'

slider()

preloader()
    .then(() => {
      console.log('done');
      
    })