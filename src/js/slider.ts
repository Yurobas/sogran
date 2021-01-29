export default class Slider {
  container: HTMLElement;
  slides: Array<HTMLElement>;
  sliderWidth: number;
  touchId: number = null;
  coordStart: number = 0;
  coordCurrent: number = 0;
  nextSlide: number = 0;
  activeSlide: number = 0;
  isDragable: boolean;

  constructor(el: string) {
    this.container = document.querySelector(el);
    this.sliderWidth = this.container.getBoundingClientRect().width;
    this.slides = [...(this.container.querySelectorAll('.slider__item') as NodeListOf<HTMLElement>)];

    this.listeners();
    this.touchListeners();
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
      if (this.touchId) return;

      const {pageX, identifier} =  event.changedTouches[0];
      this.coordStart = pageX;
      this.touchId = identifier;

      this.isDragable = true;
      console.log('start: ', event);
    });

    document.addEventListener('touchmove', event => {
      if (!this.isDragable) return;

      const item = this.findActiveTouch(event.changedTouches);
      if (!item) return;

      const { pageX } = item;
      this.coordCurrent = pageX;

      const translate = (this.coordStart - this.coordCurrent) / this.sliderWidth * 100;

      if (translate > 0) {
        this.imageMove(translate);
      } else {
        this.imageMove(translate);
      }

      console.log('move: ', event);
    });

    document.addEventListener('touchend', event => {
      this.isDragable = false;

      const item = this.findActiveTouch(event.changedTouches);
      if (!item) return;

      const { pageX } = item;
      this.coordCurrent = pageX;

      this.goTo();
      
      let id = event.changedTouches[0].identifier;
      if (this.touchId !== id) return;

      this.coordStart = 0;
      this.coordCurrent = 0;

      console.log('end: ', event);
    });
  }

  findActiveTouch(arr: TouchList) {
    const items = [...arr];
    const { touchId } = this;
    const item = items.find(item => touchId === item.identifier);
    return item;
  }

  goTo() {

  }

  imageMove(translate: number) {
    const { slides } = this;

    if (translate > 0) {
      this.nextSlide = Math.max(this.activeSlide - 1, 0);
    } else {
      this.nextSlide = Math.min(this.activeSlide + 1, slides.length);
    }

    const { nextSlide } = this;
    slides[nextSlide].style.transform = `translate3d(${translate}%, 0, 0)`;
  }


}