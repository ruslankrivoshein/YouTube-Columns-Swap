function listenForClicks() {
  document.addEventListener('click', (e) => {
    function swapOnCommand(tabs) {
      browser.tabs.sendMessage(tabs[0].id, {
        command: 'swapOn'
      })
    }

    function swapOffCommand(tabs) {
      browser.tabs.sendMessage(tabs[0].id, {
        command: 'swapOff',
      })
    }

    function reportError(error) {
      console.error(`Could not swap: ${error}`)
    }

    if (e.target.nodeName === 'BUTTON' && !e.target.classList.contains('swaped')) {
      browser.tabs.query({ active: true, currentWindow: true })
        .then(swapOnCommand)
        .then(e.target.classList.add('swaped'))
        .catch(reportError)
    }
    else if (e.target.nodeName === 'BUTTON' && e.target.classList.contains('swaped')) {
      browser.tabs.query({ active: true, currentWindow: true })
        .then(swapOffCommand)
        .then(e.target.classList.remove('swaped'))
        .catch(reportError)
    }
  })
}

function reportExecuteScriptError(error) {
  document.querySelector("#popup-content").classList.add("hidden");
  document.querySelector("#error-content").classList.remove("hidden");
  console.error(`Failed to execute content script: ${error.message}`);
}

browser.tabs.executeScript({ file: '/content_scripts/YouTubeColumnsSwap.js' })
  .then(listenForClicks)
  .catch(reportExecuteScriptError)
