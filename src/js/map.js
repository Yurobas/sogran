import icon from '../images/icons/marker.svg'
import { checkMedia } from './checkMedia'

export function map() {

  ymaps.ready(init)

  function init() {
    const map = new ymaps.Map("map", {
        center: [55.716428, 37.769370],
        controls: ['zoomControl'],
        zoom: 12
    })

    let size = { 
      width: 0, 
      height: 0,
      offsetX: 0,
      offsetY: 0 
    }

    let media = checkMedia()
    let { width, height, offsetX, offsetY } = size

    switch (media) {
      case 'wide':
        width = 60
        height = 85
        offsetX: 0
        offsetY: 0 
        break
      case 'desktop':
        width = 60
        height = 85
        offsetX: 0
        offsetY: 0 
        break
      case 'notebook':
        width = 48
        height = 68
        offsetX: 0
        offsetY: 0 
        break
      case 'tablet':
        width = 38
        height = 54
        offsetX: 0
        offsetY: 0 
        break
      case 'phone':
        width = 38
        height = 54
        offsetX: 0
        offsetY: 0 
        break
      default:
        width = 60
        height = 85
        offsetX: 0
        offsetY: 0 
        break
    }

    const point = new ymaps.Placemark([55.716428, 37.769370], {
        balloonContent: 'г. Москва, Рязанский проспект 26, строение 1',
    }, {
        iconLayout: 'default#image',
        iconImageHref: icon,
        iconImageSize: [width, height],
        iconImageOffset: [-30, -70],
    })

    map.geoObjects.add(point)
  }
}