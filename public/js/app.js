const log = console.log;

log('Ucitan client side js');



const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');
const messageError = document.querySelector('#message-error');
const messageLoad = document.querySelector('#message-load');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;
    messageLoad.innerHTML = 'Loading weather';
    messageError.innerHTML = '';
    messageOne.innerHTML = '';
    messageTwo.innerHTML = '';
    fetch(`http://localhost:3000/weather?address=${location}`).then((response) =>{
    response.json().then((data) => {
        if(data.error) {
            messageError.innerHTML = data.error;
            messageLoad.innerHTML = '';
        } else {
            messageOne.innerHTML = data.address;
            messageTwo.innerHTML = data.forecast;
            messageLoad.innerHTML = '';
        }
    });
})
})