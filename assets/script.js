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
    .then(function(response){
        return response.json();
    }).then(function(data){
        console.log(data);
        
    })
}
//event listener for submit button
formEl.addEventListener("submit", getAPI);