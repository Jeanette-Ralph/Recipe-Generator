var formEl = document.querySelector("#user-form");
//Edamam API
var endpointURL = "https://api.edamam.com/search?";
var appKey = "71d09702eb91ca96b0d97199f6a9702a";
var appID = "9b63d55f";
//Second API - Need to find one!

var submitBtn = document.querySelector("#search-btn");
var clearBtn = document.querySelector("#clear-btn");

function getAPI(event) {
    event.preventDefault();
    var q = $('#q').val();
    var queryURL = endpointURL + "q=" + q + "&app_id=" + appID + '&app_key=' + appKey + '&from=0&to=4';
    fetch(queryURL)
        .then(function (response) {
            return response.json();
        }).then(function (data) {
            console.log(data);

        })
}
//event listener for submit button
formEl.addEventListener("submit", getAPI);

// adding event listener to submit button in search form
var searchBtn = document.getElementById('search-btn').addEventListener('click', saveIngredients);

var searchHistory = document.getElementById('ingredient-search-history');

// saving the input to local storage 
// appending the input from local storage to the ingreedients search history div
function saveIngredients() {

    // getting input from the input tag id 
    var input = document.getElementById('ingredients').value;

    // setting items to a key and value in local storage
    localStorage.setItem('ingredients-list', input);

    // retrieving thee item from local storage
    input = localStorage.getItem('ingredients-list');

}

function searchHistory() {
    // might need an empty array to append the input ?

    // creating li element to append ingredients from local storage to
    var ingredientsList = document.createElement('li');

    input = document.getElementById('ingredient-search-history').textContent;

    // creating text of input values
    var ingredients = document.innerText(input);

    // appending ingredients to ingredientsList

    ingredientsList.appendChild(ingredients);

    // creating variabale for ingredient-search-history div 

    var searchHistory = document.getElementById('ingredient-search-history');

    // appending the li element with the ingredients list to the main div 
    searchHistory.appendChild('li');
}




