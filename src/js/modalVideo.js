
const modals = [...document.querySelectorAll('.modal.--video')]

export function autoplayModalVideo() {
  let script = document.createElement('script');
  script.src = "https://www.youtube.com/iframe_api";
  let firstScript = document.getElementsByTagName('script')[0];
  firstScript.parentNode.insertBefore(script, firstScript);

  modals.forEach(modal => {
    let player;
    const video = modal.querySelector('.modal__video')
    const id = video.dataset.id
    const trigger = modal.querySelector('[type="checkbox"]')

    onYouTubeIframeAPIReady()

    function onYouTubeIframeAPIReady() {
      player = new YT.Player(video, {
        width: '100%',
        height: '100%',
        playerVars: { 'autoplay': 0, 'controls': 0, 'showinfo': 0, 'rel': 0 },
        videoId: id,
        events: {
          'onReady': onPlayerReady
        }
      });
    }

    trigger.addEventListener('change', event => {
      if (trigger.checked) {
        player.playVideo()
      } else {
        player.pauseVideo()
      }
    })
  })
}