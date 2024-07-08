
let bakeCake = new Promise((resolve, reject) => {
    let isCakeReady = true; // Let's say the cake will be ready

    if (isCakeReady) {
        resolve("Here's your cake!");
    } else {
        reject("Sorry, no cake today.");
    }
});


bakeCake.then((message) => {
    console.log(message); // This runs if the promise is fulfilled
}).catch((error) => {
    console.log(error); // This runs if the promise is rejected
});










// Wait until the HTML document is fully loaded and ready
document.addEventListener('DOMContentLoaded', () => {
    // Find the button with the ID 'getFact' and add an event listener to it
    document.getElementById('getFact').addEventListener('click', () => {
        // When the button is clicked, execute this function

        // Use the fetch function to make an API request to the 'Cat Facts' API
        fetch('https://catfact.ninja/fact')
            // The fetch function returns a Promise that resolves to the response of the request
            .then(response => {
                // Convert the response to JSON format
                return response.json();
            })
            .then(data => {
                // The JSON data from the API response is now available as 'data'
                // 'data' contains an object with a 'fact' property that holds the cat fact

                // Find the paragraph element with the ID 'catFact'
                const factParagraph = document.getElementById('catFact');
                // Set the text content of the paragraph to the cat fact from the API response
                factParagraph.textContent = data.fact;
            })
            .catch(error => {
                // If there is an error (e.g., network problem), it will be caught here
                // Log the error to the console for debugging
                console.error('Error:', error);
            });
    });
});



// syn
console.log('habiba')       //habiba
console.log('10 20 30 40')  //10 20 30 40
console.log('12345')        //12345



console.log('100 200')  // 100 200
console.log('300 400') // 300 400
setTimeout(function()
{
    console.log('habiba')       //habiba
},5000);
console.log('500 600') // 500 600