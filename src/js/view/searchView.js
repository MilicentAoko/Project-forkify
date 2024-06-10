class SearchView {
  _parentElement = document.querySelector('.search');

  // 1.1
  /**
   * a method inside the searchView that returns the input value=query
   * @returns query
   */
  getQuery() {
    const query = this._parentElement.querySelector('.search__field').value;
    this._clearInput();
    return query;
  }

  /**
   * listens for submit in searchView and execute the controlSearchResults in the controller
   * @param {function} handler psp implimentation
   * 
   */

  // 1.2
  addHandlerSearch(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }

  /**
   * Generic method to use inside this class from encapsulation _
   */
  _clearInput() {
    this._parentElement.querySelector('.search__field').value = '';
  }
}

export default new SearchView();
