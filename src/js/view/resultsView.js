import View from './view';
import previewView from './previewView.js';
import icons from 'url:../../img/icons.svg';

class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = `No recipe found for your query! please try again;)`;
  _generateMarkup() {
    //  at least the map method does some work in the background, that is why we do not call the _generateMarkupPreview by our own
    return this._data
      .map(result => previewView.render(result, false))
      .join('');
  }
}

export default new ResultsView();
