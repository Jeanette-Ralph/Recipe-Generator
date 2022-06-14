var formEl = document.querySelector("#user-form");
var recipeResults = document.querySelector("#recipe-results");
//Edamam API
var endpointURL = "https://api.edamam.com/search?";
var appKey = "71d09702eb91ca96b0d97199f6a9702a";
var appID = "9b63d55f";
//Second API - Need to find one!

var submitBtn = document.querySelector("#search-btn");
var clearBtn = document.querySelector("#clear-btn");

function searchHistory(q) {

    console.log(q);
    // get items from local storage, if there are nothing in local storage set to empty array, need JSON parsing it from a string
    var searchedIngredients = JSON.parse(localStorage.getItem('ingredients-list')) || [];

    // pushing new values to the array
    searchedIngredients.push(q);

    // reset local history, JSON to put it in back to string in local storage
    localStorage.setItem('ingredients-list', JSON.stringify(searchedIngredients));

    renderSearchHistory();

}

function renderSearchHistory() {

    var searchHistory = document.getElementById('ingredient-search-history');

    // creating the list wrapper for ingredients to go in
    var ingredientsList = document.createElement('ul');

    // need to make the div empty, so the ingredients don't append to the page on load
    searchHistory.innerHTML = '';

    // need JSON parsing it from a string
    var searchedIngredients = JSON.parse(localStorage.getItem('ingredients-list')) || [];

    // baclwards loop so that the most recent search history is on the top
    for (var i = searchedIngredients.length - 1; i >= 0; i--) {

        // creating li element to append ingredients from local storage to
        var ingredient = document.createElement('li');

        // the ingredients are then set to the index value of the searched ingredients
        ingredient.textContent = searchedIngredients[i];

        // appending the ingredient to the ingredientList
        ingredientsList.appendChild(ingredient);

    }

    // appending ingredientsList to the main div 
    searchHistory.appendChild(ingredientsList);


}

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
            searchHistory(q);

        });

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
        healthLabels.innerText = fourRecipes[i].recipe.healthLabels[0, 1, 2, 3, 4, 5, 6, 7]; // returns some health labels we did not ask for
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
renderSearchHistory();






