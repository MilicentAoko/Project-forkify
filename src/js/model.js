import { async } from 'regenerator-runtime';

import { API_URL } from './config.js';
// import { getJSON , sendJSON } from './helpers.js';
import {AJAX } from './helpers.js';
import { RES_PER_PAGE ,KEY } from './config.js';
export const state = {
  recipe: {},
  search: {
    //  Query would be useful in case of analytics in the future to know which queries are made the most
    query: '',
    results: [],
    resultsPerPage: RES_PER_PAGE,
    page: 1,
  },
  bookmarks: [],
};
const createRecipeObject = function(data){
  const {recipe}= data.data;
return  {
  id: recipe.id,
  title: recipe.title,
  publisher: recipe.publisher,
  sourceUrl: recipe.source_url,
  image: recipe.image_url,
  servings: recipe.servings,
  ingredients: recipe.ingredients,
  cookingTime: recipe.cooking_time,
  ...(recipe.key && {key: recipe.key}),
};
}


/**
 * sets for the recipe in the state
 * sets the state.recipe.bookmarked = true|| false
 * @param {id} id sliced from hash
 * 
 */
export async function loadRecipe(id) {
  try {
    const data = await AJAX(`${API_URL}${id}?key=${KEY}`);

    state.recipe= createRecipeObject(data)

    
    if (state.bookmarks.some(bookmark => bookmark.id === id))
    // set to true so that we can highlight it  during a new load
      state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;
  } catch (err) {
    //  Handling the error temporarily
    console.error(`${err} 💣💣`);

    //error handling into the dom
    throw err;
  }
}


/**
 * get the data
 * side effect to  re-set the state 
 * @param {string} query 
 * @returns {Object} an object of the fetched data
 */
export async function loadSearchResults(query) {
  try {
    state.search.query = query;

    const data = await AJAX(`${API_URL}?search=${query}&key=${KEY}`);
    // console.log(data.data.recipes);// an array of objects
    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
        // && returns first  false
        //  // returns last false
        // NOT YET TESTED
        // key: rec.key? rec.key : null
        // rec.key: rec.key?? null
        ...(rec.key && { key: rec.key }),
      };
    });
    // state.search.page = 1;
  } catch (err) {
    console.error(`${err} 💣💣`);
    throw err;
  }
}

//  it is important to store the page in the state to keep track of the current page


/**
 * a generic function that returns the number of results from an array to be displayed on the page
 * @param {number} page 
 * @returns a sliced number of results from the state to be rendered 
 */
export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultsPerPage; //0; 10 results per page
  const end = page * state.search.resultsPerPage;
  return state.search.results.slice(start, end);//  the end results is never included
};

export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;

    //  newQT= oldquantity*newServings/ old servings
  });
  state.recipe.servings = newServings;
};

/**
 * sets the data into local storage
 */
const persistBookmarks = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

/**
 * sets the received object to bookmarks array
 * calls local storage function
 * @param {Object} recipe 
 */
export const addBookMark = function (recipe) {
  //  add bookmarks
  state.bookmarks.push(recipe);

  //  mark current recipe as bookmarked
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;

  persistBookmarks();
};

export const deleteBookmark = function (id) {
  // delete bookmark
  const index = state.bookmarks.findIndex(el => el.id === id);
  state.bookmarks.splice(index, 1);

  //  mark current recipe not bookmarked

  if (id === state.recipe.id) state.recipe.bookmarked = false;
  persistBookmarks();
};

const init = function () {
  const storage = localStorage.getItem('bookmarks');
  if (storage) state.bookmarks = JSON.parse(storage);
};
init();
console.log(state.bookmarks);

const clearBookmark = function () {
  localStorage.clear('bookmarks');
};

// clearBookmark()
/**
 * sets the newRecipe to the state entry of the value object; calls for addBookmark function
 * @param {Object} newRecipe 
 */
export const uploadRecipe =  async function (newRecipe) {
  //  create an arrray of entries
try{
  const ingredients = Object.entries(newRecipe)
    .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
    .map(ing => {
       const ingArr=ing[1].split(',').map(el=>el.trim());

       if(ingArr.length !==3) throw new Error('Wrong ingredient format, please use correct format');
      const [quantity, unit ,description]= ingArr
      return { quantity : quantity? +quantity: null, unit, description};
    }); 
    const recipe = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      cooking_time: +newRecipe.cookingTime,
      servings: +newRecipe.servings,
      ingredients,
    };
    console.log(recipe);
    const data= await AJAX(`${API_URL}?key=${KEY}`, recipe);

    state.recipe = createRecipeObject(data);
    addBookMark(state.recipe);
  }catch(err){
    throw err;
  }
};
