const {ipcRenderer, shell, clipboard} = require('electron')

const moment = require('moment')

let now = moment()
let utcNow = moment.utc()

let userEntered = undefined

document.addEventListener('click', (event) => {

  if (event.target.href) {
    // Open links in external browser
    shell.openExternal(event.target.href)
    event.preventDefault()
  } else if (event.target.classList.contains('js-summary')) {
    clipboard.writeText(''+now.valueOf(), 'selection')
  } else if (event.target.classList.contains('js-quit-action')) {
    window.close()
  } else if(event.target.id === 'localTime') {
    
    document.getElementById('year').value = now.format('YYYY')
    document.getElementById('month').value = now.format('MM')
    document.getElementById('day').value = now.format('DD')

    document.getElementById('hour').value = now.format('hh')
    document.getElementById('minute').value = now.format('mm')
    document.getElementById('second').value = now.format('ss')
  }
})

const getGeoLocation = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject)
  })
}

const updateView = () => {
  now = moment()
  utcNow = moment.utc()

  const millisTime = now.valueOf()

  const localDateTime = now.format('MMMM Do YYYY h:mm:ss a')
  const utcDateTime = utcNow.format('MMMM Do YYYY h:mm:ss a')

  document.querySelector('.js-summary').textContent = millisTime
  document.querySelector('.js-localDateTime').textContent = localDateTime
  document.querySelector('.js-utcDateTime').textContent = utcDateTime

  let newTime = moment()

  newTime.set('year', document.getElementById('year').value !== '' ? document.getElementById('year').value : 1970)
  newTime.set('month', document.getElementById('month').value !== '' ? document.getElementById('month').value : 1)
  newTime.set('date', document.getElementById('day').value !== '' ? document.getElementById('day').value : 1)
  newTime.set('hour', document.getElementById('hour').value !== '' ? document.getElementById('hour').value : 1)
  newTime.set('minute', document.getElementById('minute').value !== '' ? document.getElementById('minute').value : 1)
  newTime.set('second', document.getElementById('second').value !== '' ? document.getElementById('second').value : 1)
  newTime.set('millisecond', 0)

  document.getElementById('convertEpoch').textContent = newTime.valueOf()

}

// Refresh every second

// TODO probably only while running though!
const oneSecond = 1000
setInterval(updateView, oneSecond)

// Update initial times when loaded
document.addEventListener('DOMContentLoaded', updateView)
