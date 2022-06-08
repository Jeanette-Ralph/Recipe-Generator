var formEl = document.querySelector("#user-form");
var recipeResults = document.querySelector("#recipe-results");
//Edamam API
var endpointURL = "https://api.edamam.com/search?";
var appKey = "71d09702eb91ca96b0d97199f6a9702a";
var appID = "9b63d55f";
//Second API - Need to find one!

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
}

function displayRecipes(fourRecipes) {
    for (var i = 0; i < 4; i++) {
        console.log(fourRecipes[i])
        var card = document.createElement("div");
        var recipeName = document.createElement('h4');
        var recipeImage = document.createElement('img');
        var recipeServes = document.createElement('p');
        var healthLabels = document.createElement('p');
        recipeName.innerText = fourRecipes[i].recipe.label;
        recipeServes.innerText = "Servings: " + fourRecipes[i].recipe.yield;
        healthLabels.innerText = fourRecipes[i].recipe.healthLabels[0,1,2,3,4,5,6,7]; // returns some health labels we did not ask for
        var recipeImageLocation = fourRecipes[i].recipe.image;
        console.log(recipeImageLocation) // is a valid URL to recipe image
        card.appendChild(recipeName);
        card.appendChild(recipeServes);
        card.appendChild(healthLabels);
        card.appendChild(recipeImage); // figure out how to wrap an anchor tag around the appended image so that you can follow the link  to the recipe.
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

   

// }





