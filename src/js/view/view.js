import icons from 'url:../../img/icons.svg';
//  we are exporting because we will not use for instantiation but only for inheritance
export default class View {
  _data;

  // JX Documentation

  /**
   * Render the received object to the DOM
   * @param {Object | Object[]} data the data to be rendered eg the recipe
   * @param {boolean } [render =true] if false create a markup string instead of rendering to the DOM
   * @returns {undefined | string } A markup string is returned if render= false
   * @this {Object} View instance
   * @author Elvin Juma
   * @todo Finish implimentation
   */

  render(data, render = true) {
    //  Array.isArray(data) checks for array

    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    this._data = data;
    const markup = this._generateMarkup();

    if (!render) return markup;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  /**
   * generic function inside the view  that  updates the DOM
   * sets the this_data
   * updates the attributes value and the text connted of each value
   * @param {Object | []} data
   * @returns undefined
   */
  update(data) {
    // if (!data || (Array.isArray(data) && data.length === 0))
    //   return this._renderError(); // comment due to page refresh
    this._data = data;

    // get the string
    const newMarkup = this._generateMarkup();
    //  convert into DOM
    const newDom = document.createRange().createContextualFragment(newMarkup);
    // convert into an array
    const newElements = Array.from(newDom.querySelectorAll('*')); //comes from the string
    const curElements = Array.from(this._parentElement.querySelectorAll('*')); //comes from the parent elem index.html // the existing markup

    // The isEqualNode() method of the Node interface tests whether two nodes are equal. Two nodes are equal when they have the same type, defining characteristics (for elements, this would be their ID, number of children, and so forth), its attributes match, and so on.

    //  newEl.firstChild?.nodeValue  it doesnt matter, input.value, btn.textcontent  etc
    newElements.forEach((newEl, i) => {
      //  looping through 2 arrays with one loop  function condition must be of equal length
      const curEl = curElements[i];

      // update changed text
      //  incase there is a change made
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        // console.log('YoWW', newEl.firstChild?.nodeValue.trim());
        curEl.textContent = newEl.textContent;
      }

      // update changed attributes
      if (!newEl.isEqualNode(curEl)) {
        // console.log("ATTRIBUTES",newEl.attributes);
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }

  /**
   * reusable method in the view -renders the spinner markup to the set parent element
   */
  renderSpinner() {
    const markup = `
        <div class="spinner">
          <svg>
            <use href="${icons}#icon-loader"></use>
          </svg>
        </div>
`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  renderError(message = this._errorMessage) {
    const markup = ` <div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(message = this._message) {
    const markup = ` <div class="message">
            <div>
              <svg>
                <use href="${icons}#icon-smile"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
