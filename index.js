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
  } else if (event.target.classList.contains('js-epochTime')) {
    clipboard.writeText(''+userEntered.valueOf(), 'selection')
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

const dateTimeFormat = 'MMMM Do YYYY hh:mm:ss a'

const isNumberElementAndExist = (id) => {
  return document.getElementById(id) && document.getElementById(id).value !== '' && !isNaN(document.getElementById(id).value)  
}

const getNumberElement = (id, numberDefault = 0, zeroIndexed = false) => {
  return isNumberElementAndExist(id) ? zeroIndexed ? Number(document.getElementById(id).value) - 1 : Number(document.getElementById(id).value) : numberDefault
}

const updateView = () => {
  now = moment()
  utcNow = moment.utc()

  const millisTime = now.valueOf()

  const localDateTime = now.format(dateTimeFormat)
  const utcDateTime = utcNow.format(dateTimeFormat)

  document.querySelector('.js-summary').textContent = millisTime
  document.querySelector('.js-localDateTime').textContent = localDateTime
  document.querySelector('.js-utcDateTime').textContent = utcDateTime

  userEntered = moment()

  const customDateEntered = isNumberElementAndExist('year') ||
                            isNumberElementAndExist('month') ||
                            isNumberElementAndExist('date') ||
                            isNumberElementAndExist('hour') ||
                            isNumberElementAndExist('minute') ||
                            isNumberElementAndExist('second')
    
  if(customDateEntered && document.getElementById('convertEpoch').value === '') {

    userEntered.set('year', getNumberElement('year', 1970))
    userEntered.set('month', getNumberElement('month', 0, true))
    userEntered.set('date', getNumberElement('day', 0))
    userEntered.set('hour', getNumberElement('hour', 0))
    userEntered.set('minute', getNumberElement('minute', 0))
    userEntered.set('second', getNumberElement('second', 0))
    userEntered.set('millisecond', 0)
  
    const epochLocalDateTime = userEntered.format(dateTimeFormat)
    const epochUtcDateTime = userEntered.utc().format(dateTimeFormat)
    document.querySelector('.js-epochLocalDateTime').textContent = epochLocalDateTime
    document.querySelector('.js-epochUtcDateTime').textContent = epochUtcDateTime

    document.querySelector('.js-epochTime').textContent = userEntered.valueOf()  
  } else if(document.getElementById('convertEpoch').value !== '') {

    if(!isNaN(document.getElementById('convertEpoch').value)) {
      const convertEpoch = moment(Number(document.getElementById('convertEpoch').value))
      const epochLocalDateTime = convertEpoch.format(dateTimeFormat)
      const epochUtcDateTime = convertEpoch.utc().format(dateTimeFormat)
      document.querySelector('.js-epochLocalDateTime').textContent = epochLocalDateTime
      document.querySelector('.js-epochUtcDateTime').textContent = epochUtcDateTime

      document.querySelector('.js-epochTime').textContent = convertEpoch.valueOf()
    }
  }

}

// Refresh every second

// TODO probably only while running though!
const oneSecond = 1000
setInterval(updateView, oneSecond)

// Update initial times when loaded
document.addEventListener('DOMContentLoaded', updateView)
