import Mask from './mask'

export default class Form {
  el: HTMLFormElement
  inputFile: HTMLInputElement
  inputFileBlock: HTMLInputElement
  remove: HTMLElement
  emailBlock: HTMLElement
  email: HTMLInputElement
  sessionID: HTMLInputElement

  phone: HTMLInputElement
  phoneBlock: HTMLElement

  phoneMask: Mask

  _phoneCache = ''

  constructor(form) {
    this.el = form
    this.inputFile = form.querySelector('input[type="file"]')
    this.inputFileBlock = this.inputFile.closest('.form__label')
    this.remove = this.inputFileBlock.querySelector('.form__placeholder-clear')

    this.sessionID = form.querySelector('input[name="sessid"]')

    this.emailBlock = form.querySelector('[inputmode="email"]').closest('.form__label')
    this.email = this.emailBlock.querySelector('input')

    this.phone = form.querySelector('[inputmode="tel"]')
    this.phoneBlock = this.phone.closest('.form__label')
    

    this.listeners()
  }

  listeners(){

    const sessionID = getCookie('PHPSESSID')
    this.sessionID.value = sessionID

    function getCookie(name) {
      let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
      ));
      return matches ? decodeURIComponent(matches[1]) : undefined;
    }

    const fnFiles = (event: Event) => {
      this.testFile()
    }

    setTimeout(() => {
      fnFiles()
    });

    this.inputFile
      .addEventListener('change', fnFiles)

    this.remove.addEventListener('click', (event: Event) => {
      event.preventDefault()

      this.setFileName()
      this.setFileError(false)
      this.hideFileRemove(false)
      this.inputFile.value = ''
      this.inputFile.dispatchEvent(new CustomEvent('change'))
    })

    this.email.addEventListener('blur', (event) => {
      this.testEmail()
    })

    this.email.addEventListener('focus', event => {
      this.setEmailError()
    })


    this.phone.addEventListener('blur', (event) => {
      this.testPhone()
      setTimeout(() => {
        if (!this.phoneMask.keysArray?.length) {
          this._phoneCache = this.phone.value
          this.phone.value = ''
        }
      })
    })

    this.phone.addEventListener('focus', event => {
      if (!this.phoneMask.keysArray?.length) {
        this.phone.value = this._phoneCache
      }
      this.setPhoneError()
    })

    const phoneMask = new Mask(this.phone)
    this.phoneMask = phoneMask
    // this.phone.dispatchEvent(new CustomEvent('blur'))

    setTimeout(() => {
      if (!this.phoneMask.keysArray?.length) {
        this._phoneCache = this.phone.value
        this.phone.value = ''
      }
    })

    this.el.addEventListener('submit', (event) => {
      event.preventDefault()
      this.testFile()
      this.testEmail()
      this.testPhone()

      this.el.classList.add('--blocked')
      fetch(this.el.action, {
        method: this.el.method || 'POST',
        body: new FormData(this.el)
      })
        .then(() => {
          setHeight()
          this.el.classList.add('--success')
          this.el.classList.remove('--blocked')
          this.el.reset()
        })
        .catch(() => {
          this.el.classList.remove('--blocked')
          alert('Не удалось отправить форму')
        })
    })

    document.querySelector('#callback').addEventListener('change', (event) => {
      [...document.querySelectorAll('.modal form')].forEach(item => {
        item.classList.remove('--success')
        removeHeight()
      })
    })
  }

  setHeight() {
    const container = this.el.querySelector('.form__container')
    const success = this.el.querySelector('.form__success-container')
    const height = success.getBoundingClientRect().height
    container.style.height = height + 'px'
  }

  removeHeight() {
    const container = this.el.querySelector('.form__container')
    container.style.height = 'auto'
  }

  testFile(){
    const file = this.inputFile.files[0]
      
    const {
      size = 0,
      name,

    } = file ?? {}

    // 2 ** 20 = 1 мб
    
    if (size / 2 ** 20 > 10) {
      this.setFileError(true)
      this.inputFile.value = ''
    } else {
      this.setFileName(name)
      this.setFileError(false)
    }

    if (!this.inputFile.files.length) {
      this.hideFileRemove(true)
    } else {
      this.hideFileRemove(false)
    }
    
  }

  testEmail(){
    if (!this.email.value) {
      this.setEmailError()
      return
    }
    
    if (!/.@.+?\..{2,7}/.test(this.email.value)) {
      this.setEmailError(true)
    } else {
      this.setEmailError()
    }
  }

  testPhone(){
    if (!this.phoneMask.test()) {
      this.setPhoneError(true)
    } else {
      this.setPhoneError()
    }
  }


  setFileName(name = 'Прикрепить файл') {
    this.inputFileBlock.querySelector('.form__placeholder-text').innerHTML = name
  }

  setFileError(isSet){
    this.inputFileBlock.classList[isSet ? 'add': 'remove']('--error')
  }

  setEmailError(isSet){
    this.emailBlock.classList[isSet ? 'add': 'remove']('--error')
  }

  setPhoneError(isSet){
    this.phoneBlock.classList[isSet ? 'add': 'remove']('--error')
  }

  hideFileRemove(isHide){
    this.remove.style.display = isHide ? 'none' : ''
  }
}