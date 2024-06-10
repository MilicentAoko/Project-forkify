import View from './view';
import previewView from './previewView.js';
import icons from 'url:../../img/icons.svg';

class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = `There are no  bookmarks yet, go ahead, find one ;)`;
  _message='';


  // the click event for the addBookmark is done in the recipe view
  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }
  _generateMarkup() {
    //  at least the map method does some work in the background, that is why we do not call the _generateMarkupPreview by our own
    // console.log(previewView.render(this._data, false));
    const data =this._data.map(bookmark => {
      return previewView.render(bookmark, false)
    }).join('');
    // console.log(data);
    return data;
  }
}

export default new BookmarksView();
