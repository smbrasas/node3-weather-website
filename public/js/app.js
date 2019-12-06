console.log('Client side js file is loaded!')

/* fetch('http://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
        console.log(data)
    })
})
 */

/* fetch('http://localhost:3000/weather?address=Boston').then((response) =>{
    response.json().then((data) =>{
        //console.log(data)
        if(data.error){
            console.log('Unable to find the location')
        }else{
            console.log(data.location)
            console.log(data.forecast)
        }
    })
}) */

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

//messageOne.textContent = 'From javascript'

weatherForm.addEventListener('submit', (e) =>{
    e.preventDefault()

    const location = search.value
    //console.log('submitted. location='+location)

    messageOne.textContent='Loading'
    messageTwo.textContent=''

    //fetch('http://localhost:3000/weather?address='+location).then((response) =>{
        //para que funcione en todos los entornos
        fetch('/weather?address='+location).then((response) =>{
    response.json().then((data) =>{
        //console.log(data)
        if(data.error){
            console.log('Sorry! Unable to find the location')
            messageOne.textContent=data.error
        }else{
            console.log(data.location)
            console.log(data.forecast)
            messageOne.textContent=data.location
            messageTwo.textContent=data.forecast
        }
    })
})
})

