(() => {
  if (window.hasRun) {
    return
  }
  window.hasRun = true

  function swapOn() {
    const primary = document.querySelector('#columns #primary')
    const secondary = document.querySelector('#columns #secondary')

    document.querySelector('#columns').insertBefore(secondary, primary)
    secondary.style.marginLeft = '24px'
  }

  function swapOff() {
    const primary = document.querySelector('#columns #primary')
    const secondary = document.querySelector('#columns #secondary')

    document.querySelector('#columns').insertBefore(primary, secondary)
    secondary.style.marginLeft = '0'
  }

  browser.runtime.onMessage.addListener((message) => {
    if (window.location.href.includes('youtu') && window.location.href.includes('watch')) {
      if (message.command === 'swapOn') {
        swapOn()
      } else if (message.command === 'swapOff') {
        swapOff()
      }
    }
  })
})()
