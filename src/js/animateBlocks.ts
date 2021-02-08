export default () => {
  [...document.querySelectorAll('.animate')]
    .forEach(item => {
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('--animated')
          }
        })
      }, {
        root: null,
        rootMargin: '0px',
        threshold: .5
      })

      observer.observe(item)
    })
}