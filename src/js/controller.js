// import icons  from '../img/icons.svg'; // parcel 1
// parcel 2
import 'core-js/stable';
import 'regenerator-runtime/runtime'; //(aync await)
import * as model from './model.js';
import recipeView from './view/recipeView.js'; // somehow there is autocompletion with defaults imports
import searchView from './view/searchView.js';
import resultsView from './view/resultsView.js';
import { MODAL_CLOSE_SEC } from './config.js';
import { getSearchResultsPage } from './model.js';
import bookmarksView from './view/bookmarksView.js';

import paginationView from './view/paginationView.js';
import addRecipeView from './view/addRecipeView.js';
// if (module.hot) {
//   module.hot.accept();
// }

// 2.1
async function controlRecipe() {
  try {
    //  getting the hash
    const hash = window.location.hash;

    const id = hash.slice(1);
    // Rendering spinner
    if (!id) return;
    recipeView.renderSpinner();
    //  0) results view to mark selected search results
    resultsView.update(model.getSearchResultsPage());
    //  Loading Recipe
    // because this is an async function, it returns a promise, we have to await
    await model.loadRecipe(id); // load the recipe to set the state and the bookmarkedValues
    // Rendering the recipe

    recipeView.render(model.state.recipe);
    
    //  updating bookmarks view

    // debugger;
    bookmarksView.update(model.state.bookmarks);
  } catch (err) {
    recipeView.renderError();
    console.error(err);
  }
}

// 1.3
async function controlSearchResults() {
  try {
    resultsView.renderSpinner();
    //1)  Get search Query
    const query = searchView.getQuery();

    if (!query) return;

    // 2)Load Search Results

    //  this function (loadSearchResults)is also a good candidate for publisher subscriber pattern
    await model.loadSearchResults(query);
    // console.log(model.state.search.results);

    // ASSUMPTION : getSearchResultsPage right here executes synchronously
    // 3) render results
    resultsView.render(model.getSearchResultsPage());

    //  4) render initial pagination buttons

    // paginationView.render(model.state.search);

    //  at least the markup breach on this
    paginationView.update(model.state.search);
  } catch (err) {
    console.log(err);
  }
}


const controlPagination = function (gotoPage) {
  //  1) render new results 
resultsView.render(model.getSearchResultsPage(gotoPage));
  // 2) render new pagination buttons 
  paginationView.render(model.state.search);
};

const controlServings=   function(newServings){
  //  1) update the recipe servings in state
 model.updateServings(newServings);
  // update the recipe view
  recipeView.update(model.state.recipe);
}

const controlAddBookmark= function(){
  // 1) Add/ delete bookmarks
  if(!model.state.recipe.bookmarked){ model.addBookMark(model.state.recipe);}
  else { model.deleteBookmark(model.state.recipe.id);
}
//  2) Update bookmarks
   recipeView.update(model.state.recipe);

  //   3)Render bookmarks

  bookmarksView.render(model.state.bookmarks)
}

const controlBookmarks= function(){
  bookmarksView.render(model.state.bookmarks)
}
const controlAddRecipe= async  function(newRecipe){
try{

  //  show loading spinner
  //  mapping API key will happen, post call happens
  addRecipeView.renderSpinner();
  //  Upload the new recipe
 await model.uploadRecipe(newRecipe);
// console.log(model.state.recipe, newRecipe);
//  Render the recipe;

recipeView.render(model.state.recipe);

//  success message

addRecipeView.renderMessage();

//  render bookmarks view

bookmarksView.render(model.state.recipe);

//  close form window

//  Change ID in URL

// window.history.pushState(state, Title, id)
window.history.pushState(null, '', `#${model.state.recipe.id}`);

// window.history.back() // when maybe going back to the last page
setTimeout(function () {
  addRecipeView.toggleWindow()
}, MODAL_CLOSE_SEC*1000)


}catch(err){
console.error('🎗🎗',err);
// addRecipeView.renderError(err.message)
}
// location.reload();
//   function to upload the new recipe data
}
// PSP logics
//  these have stuck in  execution waiting for the right time
const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks)
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe)
};

init();

//  used in debugging
// document.addEventListener('click', function(e){
//   console.log(model.state.recipe);
//   console.log(model.state.recipe.ingredients);
//   // console.log(model.updateServings());
//   console.log(model.state.recipe.servings);
// })


// this init function behaves like an open pipe, whatever the code will pass into it, it will execute without waiting for any resolve, just like the global scope code
// controlRecipe();

// window.addEventListener('hashchange', controlRecipe);
// window.addEventListener('load', controlRecipe);

// ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, controlRecipe));
