import View from './view.js';
import icons from 'url:../../img/icons.svg';

class Pagination extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    //  event delegation is a good way to go instead of loops
    this._parentElement.addEventListener('click', function (e) {
      // e.preventDefault();
      const btn = e.target.closest('.btn--inline');

      if (!btn) return;
      const gotoPage = btn.dataset.goto;
      console.log(gotoPage);
      handler(gotoPage);
    });
  }
  _generateMarkup() {
    const curPage = +this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    //  page 1 and other pages

    if (curPage === 1 && numPages > 1) {
      return `<button  data-goto="
      ${
        curPage + 1
      }"   class="btn--inline        pagination__btn--next">
            <span>${curPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>`;
    }

    //  last page
    if (curPage === numPages && curPage > 1) {
      return `<button data-goto="
      ${curPage - 1}"  class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>${curPage - 1}</spa>
          </button>`;
    }

    //  other page (we have float)
    if (curPage < numPages && curPage !== 1) {
      return ` <button  data-goto="
      ${
        curPage + 1
      }"    class="btn--inline        pagination__btn--next">
            <span>${curPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>
       
       <button data-goto="
      ${curPage - 1}"  class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>${curPage - 1}</spa>
          </button>`;
    }

    //  page 1 and no other pages
    return '';
  }
}

export default new Pagination();
