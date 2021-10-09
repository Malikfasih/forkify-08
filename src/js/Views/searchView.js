class SearchView {
  #parentEl = document.querySelector('.search');

  getQuery() {
    const query = this.#parentEl.querySelector('.search__field').value;
    this.#clear();
    return query;
  }

  #clear() {
    this.#parentEl.querySelector('.search__field').value = '';
  }

  addHandlerSearch(handler) {
    this.#parentEl.addEventListener('submit', function (e) {
      e.preventDefault(); // as we know for submission it is neccessary to prevent the default.
      handler(); // this means controlSearchRecipes()
    });
  }
}
export default new SearchView();
