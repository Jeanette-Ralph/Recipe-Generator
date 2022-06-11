var formEl = document.querySelector("#user-form");
var recipeResults = document.querySelector("#recipe-results"); //article div with ID of recipe-results
//Edamam API
var endpointURL = "https://api.edamam.com/search?";
var appKey = "71d09702eb91ca96b0d97199f6a9702a";
var appID = "9b63d55f";

//Spoonacular API
var endpointURLSpoonacular = "https://api.spoonacular.com/food/ingredients/substitutes?";
var appKeySpoon = "01d7fcde51554f22ba68c6613dcd1536";

//primary API Key = 1b359d0128f940919c6585bbcb7e80c1
//secondary API Key = 01d7fcde51554f22ba68c6613dcd1536

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
            displayRecipes(data.hits); 
        });


    //local storage//
    //Add While Loop to make the search results keep populating
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

}

var refreshBtn = document.getElementById('refresh-btn');
function refreshPage() {
    var reload = window.location.reload();
}

async function displayRecipes(fourRecipes) {
    console.log(fourRecipes)
    for (var i = 0; i < 4; i++) {
        var card = document.createElement("div");
        var recipeName = document.createElement('a');
        var recipeImage = document.createElement('img');
        var recipeServes = document.createElement('p');
        var ingredientCount = document.createElement('p');
        var ingredientList;
        var recipeImageLocation = fourRecipes[i].recipe.image;
        recipeName.innerText = fourRecipes[i].recipe.label;
        console.log(recipeName.innerText);
        recipeName.setAttribute("href", fourRecipes[i].recipe.url);
        recipeName.setAttribute('target', '_blank');
        ingredientList = fourRecipes[i].recipe.ingredientLines;
        recipeServes.innerText = "Servings: " + fourRecipes[i].recipe.yield;
        ingredientCount.innerText = "Ingredient count: " + fourRecipes[i].recipe.ingredientLines.length;
        card.appendChild(recipeName);
        card.appendChild(recipeServes);
        card.appendChild(ingredientCount);
        card.appendChild(recipeImage);
        recipeImage.setAttribute("src", recipeImageLocation);

        var queryURLSpoonacular = endpointURLSpoonacular + "apiKey=" + appKeySpoon + "&ingredientName=" + ingredientList;
        await fetch(queryURLSpoonacular) // wait for this fetch to finish
            .then(function (response) {
                return response.json();
            }).then(function (data) {
                console.log(recipeName.innerText)
                console.log(data);
                if (data.status === "success") {
                    displaySubstitutions(data, card);
                }
            });
        recipeResults.appendChild(card);

    }

}
function displaySubstitutions(subs, card) {
    var substoDisplay = document.createElement('p');
    substoDisplay.setAttribute("class", "alternatives");
    var ingredienttoSub;
    ingredienttoSub = subs.ingredient;
    substoDisplay.innerText = "Ingredient Substitutions: " + ingredienttoSub + "\n" + subs.substitutes[0] + "\n";
    card.appendChild(substoDisplay);
}

//event listener for submit button
formEl.addEventListener("submit", getAPI);

// event listener for refresh button
refreshBtn.addEventListener('click', refreshPage);









