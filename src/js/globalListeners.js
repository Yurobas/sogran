
const listeners = []

globalThis?.addEventListener('click', event => {

  function isClickInside(event, el){
    if (el instanceof Function) {
      el = el()
    }

    if (!el) {
      return
    }

    if (event.path) {
      return event.path.includes(el)
    }

    if (document.body.contains(event.target)) {
      return el.contains(event.target)
    }
    
    return true 
  }

  listeners.forEach(([item, ignoreEls, cb]) => {
    // 2 проверки, 1 надежная, 2 резервный план
    // если 1 метод не работает то он возвращает тру чтоб пошло ко 2
    
    if (isClickInside(event, item)) {
      return
    }

    const isAllInside = ignoreEls?.some(el => isClickInside(event, el)) ?? true

    if (isAllInside) {
      return
    }

    cb(event, item)
  })
})

/**
 * 
 * @param {HTMLElement} target Элемент
 * @param {Array<HTMLElement|Function>} ignoreEls Массив элементов снаружи таргета, клик по которым тоже возможен, можно передать функцию которая вернет элемент
 * @param {Function} [callback] Коллбек после клика снаружи
 * @returns {Function} Функция удаления обработчика
 */
export function clickOutside(target, ignoreEls, callback) {
  if (ignoreEls instanceof Function) {
    callback = ignoreEls
    ignoreEls = []
  }
  const arr = [target, ignoreEls, callback];
  listeners.push(arr)

  return () => {
    const index = listeners.indexOf(arr)
    if (!~index) {
      // если не нашло
      return
    }
    listeners.splice(
      listeners.indexOf(arr),
      1
    )
  }
}

const keyListeners = []

globalThis?.addEventListener('keyup', event => {

  keyListeners.forEach(([cb]) => {
    cb(event)
  })
})

export function keyupEsc(callback) {
  const arr = [
    (event) => {
      const {
        which,
        code,
        key,
        keyCode,
      } = event
      
      if (which === 27 || keyCode === 27 || code === 'Escape' || key === 'Escape') {
        return callback(event)
      }
    }
  ];
  keyListeners.push(arr)

  return () => {
    const index = keyListeners.indexOf(arr)
    if (!~index) {
      // если не нашло
      return
    }
    keyListeners.splice(
      keyListeners.indexOf(arr),
      1
    )
  }
}