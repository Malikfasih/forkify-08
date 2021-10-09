import icons from 'url:../../img/icons.svg'; // for parcel 2
import View from './View.js';

class AddRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _message = 'Recipe was successfully uploaded :)';
  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');

  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
  }

  toggleWindow() {
    this._window.classList.toggle('hidden');
    this._overlay.classList.toggle('hidden');
  }
  _addHandlerShowWindow() {
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
  }

  _addHandlerHideWindow() {
    this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
    this._overlay.addEventListener('click', this.toggleWindow.bind(this));
  }
  addHandlerUpload(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)]; // in this FormData api 'this' means <form>, and 'new FormData(this)' will return a weird object that we cannot use so we spread this obj into an array which will give us all the fields with all the values in it.
      const data = Object.fromEntries(dataArr); // this 'fromEntries()' method is opts to the 'entries' method available on arrays, this takes an array of entries and converts it into object.
      handler(data);
    });
  }
  _generateMarkup() {}
}

export default new AddRecipeView();
