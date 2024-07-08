//Search meal by name
//www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata

//Lookup full meal details by id 
//www.themealdb.com/api/json/v1/1/lookup.php?i=52772

//List all meal categories
//www.themealdb.com/api/json/v1/1/categories.php


// setting elemnets

let searchInput = document.querySelector('.searchBox input')
let searchBtn = document.querySelector('.searchBox .btn')
let recipeCards = document.getElementById('recipeCards');



// add events 
if(searchBtn)
{
searchBtn.addEventListener('click', function(){
    // handel user is input
    let searchValue = searchInput.value.trim().toLowerCase() || searchInput.value.trim().toUpperCase();
    let apiKey = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`;
    console.log(searchValue);

    //fetch(urlApi).then(function(res) to check).then(function(data) to return json)

    fetch(apiKey)
    .then(function(res){
        if(res.ok){
            return res.json();
        } else {
        throw new Error('Network response was not ok');
            console.log('value invaild')
        }
    })
    .then(function(data){
        console.log(data);
        displayMeals(data);
    })
});
}


// function to display meals after search
function displayMeals(mealsData){
    let htmlText = '';
    recipeCards.innerHTML = ''; // Clear previous results
    if(mealsData.meals.length == 0){
        htmlText = 'Input not found';
        console.log('invaild');
        if(recipeCards){
            recipeCards.innerHTML= htmlText;
        }
    }else{
       mealsData.meals.forEach(element => {
            htmlText+=`
                <div class="card" style="width: 17rem;">
                    <img src="${element.strMealThumb}" class="card-img-top" alt="${element.strMeal}">
                    <div class="card-body">
                    <h5 class="card-title">${element.strMeal}</h5>
                    <p>Category: ${element.strCategory}</p>
                    <p>Area: ${element.strArea}</p>
                   <button type="button" class="btn btn-warning" onclick='dataWithId("${element.idMeal}");'>Show Recipe</button>
                    </div>
                </div>
            `;
       });
       //update ui for search result
       if(recipeCards){
            recipeCards.innerHTML=htmlText;
       }
    }

}



// Function to display recipe details
function dataWithId(id) {
    let imgContainer =document.getElementById('img-container')
    let recipeInfo = document.getElementById('recipeInfo')
    let keyId = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;

    // Fetching recipe details
    fetch(keyId)
        .then(function(res) {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error('Network response was not ok');
            }
        })
        .then(function(data) {
            console.log(data);
            localStorage.setItem('recipeData', JSON.stringify(data));
            //update display recpie 
            setTimeout(function(){
                location.href = './meal.html';
            },500);
            
        })
        .catch(function(error) {
            console.error('Error fetching recipe details:', error);
            recipeCards.innerHTML = 'Failed to fetch recipe details. Please try again later.';
        });
}



let recipePage='';
//function to display recpie page

document.addEventListener('DOMContentLoaded', function() {
    let recipeInfo = document.getElementById('recipeInfo');
    let recipeData = localStorage.getItem('recipeData');
    if (recipeData) {
        // from local storage
        displayRecipe(JSON.parse(recipeData)); 
    } else {
        recipeInfo.innerHTML = 'No recipe data found. Please go back and select a recipe.';
    }
});

// Function to display recipe details
function displayRecipe(recipeData) {
    console.log('Displaying recipe:', recipeData); // Debugging line

    // Ensure recipeData is valid
    if (recipeData && recipeData.meals && recipeData.meals.length > 0) {
        let meal = recipeData.meals[0];

        let recipePage = `
            <div class="imgContainer">
                <img src="${meal.strMealThumb}" width="100%">
            </div>
            <div class='infoContainer'>
                <div class="instruction">
                    <h3>Instructions:</h3>
                    <p>${meal.strInstructions}</p>
                </div>
                <div class='area'>
                    <h4>Area:   ${meal.strArea}</h4>
                </div>
                <div class='name'>
                    <h4>Name:   ${meal.strMeal}</h4>
                </div>
                <div class='category'>
                    <h4>Category:   ${meal.strCategory}</h4>
                </div>
                <div class='tags'>
                    <h4>Tages:</h4>
                    <div>
                        <a href = '${meal.strSource}'><button type="button" class="btn btn-success">Source</button></a>
                        <a href = '${meal.strYoutube}'><button type="button" class="btn btn-danger">Youtube</button></a>
                    </div>
                </div>
            </div>
        `;

        //console.log('Recipe page HTML:', recipePage); 
        let recipeInfo = document.getElementById('recipeInfo');

        if (recipeInfo) {
            recipeInfo.innerHTML = recipePage;
        }
        } else {
        console.error('Invalid recipe data');
        recipeInfo.innerHTML = 'Failed to load recipe details. Please try again later.';
    }
}



// add function to display fixed items(meals on screen)
function displayFixedMeals(){
   // handel user is input
   let searchValue = searchInput.value.trim().toLowerCase() || searchInput.value.trim().toUpperCase();
   let apiKey = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`;
  
   //fetch(urlApi).then(function(res) to check).then(function(data) to return json)

   fetch(apiKey)
   .then(function(res){
       if(res.ok){
           return res.json();
       } else {
       throw new Error('Network response was not ok');
           console.log('value invaild')
       }
   })
   .then(function(data){
       console.log(data);
       updateFixedUi(data);
   })
}
displayFixedMeals();



function updateFixedUi(fixedData){
    let htmlText='';
    fixedData.meals.forEach(element => {
        htmlText+=`
            <div class="card" style="width: 17rem;">
                <img src="${element.strMealThumb}" class="card-img-top" alt="${element.strMeal}">
                <div class="card-body">
                <h5 class="card-title">${element.strMeal}</h5>
                <p>Category: ${element.strCategory}</p>
                <p>Area: ${element.strArea}</p>
               <button type="button" class="btn btn-warning" onclick='dataWithId("${element.idMeal}");'>Show Recipe</button>
                </div>
            </div>
        `;
   });
   //update ui for search result
   if(recipeCards){
        recipeCards.innerHTML=htmlText;
   }
}