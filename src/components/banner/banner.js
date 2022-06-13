import View from '../../view';

import './_banner.scss';

export default class Banner {
  constructor() {
    this.View = new View();
  }

  init() {
    this.bannerElem = document.querySelector('.js-banner__content');
  }

  renderDescription(html) {
    View.addText(this.bannerElem, html);
  }
}
