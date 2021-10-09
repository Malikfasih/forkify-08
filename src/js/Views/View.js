import icons from 'url:../../img/icons.svg';

export default class View {
  _data;

  // JS documentation
  /**
   * Render the received object to the DOM
   * @param {Object | Object[]} data The data to be render e.g(recipe)
   * @param {boolean} [render=true] If false, create markup string instead of rendering to the DOM
   * @returns {undefined | string} A markup string is returned if render=false
   * @this {Object} View instance
   * @author Malik Fasih
   * @todo Finish implementation
   */
  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError(); // this means if there is no data OR if there is data but that data is in array AND that data is empty.
    this._data = data;
    const markup = this._generateMarkup();

    if (!render) return markup;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    this._data = data;
    const newMarkUp = this._generateMarkup(); // here we have the new markup but that is just a string, so that is gona very difficult to compare to the DOM elements that we currently have on the page.
    // To fix this problem we will use a nice trick which is to basically convert this markup string to the DOM object that's living in the memory and that then we can use to compare with the actuall DOM that is on the page

    const newDOM = document.createRange().createContextualFragment(newMarkUp); // this is very then pass in the string 'newMarkup' and convert it into real DOM node.
    const newElements = Array.from(newDOM.querySelectorAll('*')); // * means all elements
    const curElements = Array.from(this._parentElement.querySelectorAll('*'));

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      // console.log(curEl, newEl.isEqualNode(curEl));

      // Update changed TEXT
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        curEl.textContent = newEl.textContent;
      }

      // Update changed ATTRIBUTES
      if (!newEl.isEqualNode(curEl))
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
    });
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  renderSpinner = function () {
    const markup = `
            <div class="spinner">
              <svg>
                <use href="${icons}#icon-loader"></use>
              </svg>
            </div>
      `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  };

  renderError(message = this._errorMessage) {
    //here we set the default value for the err
    const markup = `
          <div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
              <p>${message}</p>
        </div>
      `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(message = this._message) {
    const markup = `
            <div class="message">
              <div>
                <svg>
                <use href="${icons}.svg#icon-smile"></use>
                </svg>
              </div>
              <p>${message}</p>
            </div> `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
