const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const locationResponse = document.querySelector('#paragraph')
const weatherResponse = document.querySelector('#paragraph2')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = searchElement.value
    locationResponse.textContent = "Loading..."
    weatherResponse.textContent = " "
    fetch(`/weather?address=${location}`).then((response) => {
        response.json().then(({error, forecast} = {}) => {
            if (error) {
                locationResponse.textContent = error
            } else {
                locationResponse.textContent = `${forecast.place}. ${forecast.localTime}`
                weatherResponse.textContent = `${forecast.weather}, ${forecast.temperature} ${forecast.rain}`
            }
        })
    })
})