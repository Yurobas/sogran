
const anim = async (duration, cb: (progress: number) => boolean): Promise<void> => {
  const start = performance.now()
  
  return new Promise(() => {
    const fn = (now = performance.now()) => {
      const progress = Math.min(now / (start + duration), 1)
      

      cb(progress) && progress != 1 && requestAnimationFrame(fn)
    }


    requestAnimationFrame(fn)
  })
}

export default async function () :Promise<void> {

  const delay = 1500
  
  let isLoaded: boolean
  
  const loaded = new Promise(res => {
    window.addEventListener('load', res)
  })
  loaded.then(() => isLoaded = true)

  
  let progress
  const status = anim(delay, progress => {
    if (isLoaded) return false

    setData(97 * progress)
    
    return true
  })

  await Promise.race([status, loaded])

  setData(100)


}

let lastProgress = 0
let timeout
async function setData(progress){
  const diff =  progress - lastProgress
  if (progress - lastProgress > 10) {
    let current = diff/2 + lastProgress
    
    lastProgress = current
    render(lastProgress)
    await wait(500, () => setData(progress))
  }

  if (lastProgress > progress) {
    return 
  }

  lastProgress = progress
  render(lastProgress)
}

function render(progress){
  console.log(progress)
}

function wait(time, cb?){
  return new Promise<void>(res => {
    clearInterval(timeout)
    timeout = setTimeout(() => (cb(), res()), time)
  })
}
