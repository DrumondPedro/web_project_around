class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem(element) {
    this._container.prepend(element);
  }

  getItems() {
    return this._items;
  }

  setItems(newItems) {
    this._items = newItems;
  }

  clear() {
    this._container.innerHTML = "";
  }

  itemRenderer() {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }
}

export default Section;
