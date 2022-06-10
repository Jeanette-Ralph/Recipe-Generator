var formEl = document.querySelector("#user-form");
var recipeResults = document.querySelector("#recipe-results"); //article div with ID of recipe-results
//Edamam API
var endpointURL = "https://api.edamam.com/search?";
var appKey = "71d09702eb91ca96b0d97199f6a9702a";
var appID = "9b63d55f";
//Second API Kroger Grocery Store Product Search
    //What search parameters do we want? (brand, term, location) - https://developer.kroger.com/reference/#operation/productGet
    //var endpointURL2 = "https://api.kroger.com/v1/products?filter.brand={{BRAND}}&filter.term={{TERM}}&filter.locationId={{LOCATION_ID}}"

var submitBtn = document.querySelector("#search-btn");
var clearBtn = document.querySelector("#clear-btn");

function getAPI(event) {
    event.preventDefault();
    var q = $('#q').val(); // #q renamed from 'ingredients-list'
    var queryURL = endpointURL + "q=" + q + "&app_id=" + appID + '&app_key=' + appKey + '&from=0&to=4'; // last param specifically calling for 4 recipes
    fetch(queryURL)
        .then(function (response) {
            return response.json();
        }).then(function (data) {
            console.log(data);
            displayRecipes(data.hits); // feeds data specific to matching recipes to the display recipes function
        });
    //local storage//
    // getting input from the input tag id 
    var input = document.getElementById('q').value;

    // setting items to a key and value in local storage
    localStorage.setItem('ingredients-list', input);

    // retrieving thee item from local storage
    input = localStorage.getItem('ingredients-list');

    // var for div where the ingredients will get appended to
    var searchHistory = document.getElementById('ingredient-search-history');

    // creating li element to append ingredients from local storage to
    var ingredientsList = document.createElement('li');

    // adding text content to the input 
    ingredientsList.textContent = input;

    // appending ingredientsList to the main div 
    searchHistory.appendChild(ingredientsList);

    // need it to stay on page

    //make ingredients list clickable so you can retrive that same search result

    //link ingredients list from Edamam API to pull shopping list from kroger API

}

function displayRecipes(fourRecipes) {
    for (var i = 0; i < 4; i++) {
        console.log(fourRecipes[i])
        var card = document.createElement("div");
        var recipeName = document.createElement('a');
        var recipeImage = document.createElement('img');
        var recipeServes = document.createElement('p');
        var healthLabels = document.createElement('p');
        var ingredientCount = document.createElement('p');
        var recipeImageLocation = fourRecipes[i].recipe.image;
        recipeName.innerText = fourRecipes[i].recipe.label;
        recipeName.setAttribute("href", fourRecipes[i].recipe.url);
        recipeServes.innerText = "Servings: " + fourRecipes[i].recipe.yield;
        healthLabels.innerText = fourRecipes[i].recipe.healthLabels[0,1,2,3,4,5,6,7]; // returns only one label at a time per recipe, not specifying returns all labels
        ingredientCount.innerText = "Ingredient count: " + fourRecipes[i].recipe.ingredientLines.length;
        console.log(recipeImageLocation) // is a valid URL to recipe image
        card.appendChild(recipeName);
        card.appendChild(recipeServes);
        card.appendChild(healthLabels);
        card.appendChild(ingredientCount);
        card.appendChild(recipeImage); 
        recipeImage.setAttribute("src", recipeImageLocation);
        recipeResults.appendChild(card);
    }

}

//event listener for submit button
formEl.addEventListener("submit", getAPI);

// adding event listener to submit button to save ingredients to local storage
// submitBtn.addEventListener('click', saveIngredients);

// var searchResults = document.getElementById('ingredient-search-history');

// saving the input to local storage 

// appending the input from local storage to the ingredients search history div
// function saveIngredients() {

// code to allow user to type in new ingredient searches without refreshing the page







