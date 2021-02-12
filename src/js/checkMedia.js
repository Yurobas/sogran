export function checkMedia() {
  let media = null
  const width = window.screen.width

  width >= 1920 ? media = 'wide' : false
  width < 1920 && width >= 1440 ? media = 'desktop' : false
  width < 1440 && width >= 1024 ? media = 'notebook' : false
  width < 1024 && width >= 768 ? media = 'tablet' : false
  width < 768 ? media = 'phone' : false

  return media
}