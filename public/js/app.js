console.log("client side javascript running");

// fetch("http://localhost:3000/weather?address=sanchore").then((response) => {
//     response.json().then((data) => {
//         if (data.error) {
//             console.log(data.error);
//         }
//         else {
//             console.log(data.location);
//             console.log(data.forecast);
//         }
//     })
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msgOne = document.querySelector('#message-1')
const msgTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    msgOne.textContent = "Loading..."
    msgTwo.textContent = "";
    fetch("/weather?address=" + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                msgOne.textContent = (data.error);

            }
            else {
                msgOne.textContent = (data.location);
                msgTwo.textContent = (data.forecast);
            }
        })
    })
    // console.log(location)
})