export default class Slider {
  container: HTMLElement;
  slides: Array<HTMLElement>;
  sliderWidth: number;
  _touchId: number = null;
  coordStart: number = 0;
  nextSlide: number = 0;
  prevSlide: number = 0;
  activeSlide: number = 0;
  isDragable: boolean;
  _pr: number;

  constructor(el: string) {
    this.container = document.querySelector(el);
    this.sliderWidth = this.container.getBoundingClientRect().width;
    this.slides = [...(this.container.querySelectorAll('.slider__item') as NodeListOf<HTMLElement>)];

    this.listeners();
    this.touchListeners();
  }

  set coordCurrent(val: number){
    this.progress = (this.coordStart - val) / this.sliderWidth;
  }

  set progress(val){
    this._pr = -val

    this.move()
  }
  get progress(){
    return this._pr
  }

  listeners() {
    this.container.addEventListener('mousedown', event => {
      this.isDragable = true;
    });

    document.addEventListener('mousemove', event => {
      if (!this.isDragable) return;
    });

    document.addEventListener('mouseup', event => {
      this.isDragable = false;
    });
  }

  touchListeners() {
    this.container.addEventListener('touchstart', event => {
      if (this._touchId) return;
      this.disableTransition()

      const {pageX, identifier} =  event.changedTouches[0];
      this.coordStart = pageX;
      this.coordCurrent = pageX;
      this._touchId = identifier;

      this.isDragable = true;
      console.log('start: ', event);
    });

    document.addEventListener('touchmove', event => {
      if (!this.isDragable) return;

      const item = this.findActiveTouch(event.changedTouches);
      if (!item) return;

      const { pageX } = item;
      this.coordCurrent = pageX;

    });

    document.addEventListener('touchend', event => {
      this.isDragable = false;

      const item = this.findActiveTouch(event.changedTouches);
      if (!item) return;

      const { pageX } = item;
      this.coordCurrent = pageX;

      this.goTo(3);

      console.log('end: ', event);
    });
  }

  disableTransition(){

  }

  enableTransition(){

  }

  findActiveTouch(arr: TouchList) {
    const items = [...arr];
    const { _touchId } = this;
    const item = items.find(item => _touchId === item.identifier);
    return item;
  }

  goTo(slide: number) {
    this.nextSlide = slide
    const {
      slides,
    } = this
    this.enableTransition()

    // switch(direction) {
    //   case -1: 
    //     slides[slide].classList.add('left')
    //   default:
    //     slides[slide].classList.add('right')
    // }
    
    // requestAnimationFrame(() => requestAnimationFrame(() => {
    //   this.slides.forEach((item, index) => {
    //     switch(true) {
    //       case i < slide:
    //         item.style.transform = `translateX(${-100}%)`
    //         break
    //       case slide:
    //         item.style.transform = `translateX(${0}%)`
    //         break
    //       case slide + 1:
    //         item.style.transform = `translateX(${100}%)`
    //         break
    //       default
    //     }
    //   })
    // }))
  }

  move() {
    const { 
      slides,
      progress,
      activeSlide,
    } = this;
    console.log(progress);
    
    
    if (progress > 0) {
      this.nextSlide = Math.max(activeSlide - 1, 0);
      this.prevSlide = Math.min(activeSlide + 1, slides.length);
    } else {
      this.nextSlide = Math.min(activeSlide + 1, slides.length);
      this.prevSlide = Math.max(activeSlide - 1, 0);
    }

    const { nextSlide, prevSlide } = this;

    slides[nextSlide].style.transform = `translate3d(${nextSlide === activeSlide ? progress * 100 * .3: progress * 100}%, 0, 0)`;
    slides[prevSlide].style.transform = ``;
  }


}