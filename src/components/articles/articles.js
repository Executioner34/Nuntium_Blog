import View from '../../view';

import './_articles.scss';

export default class Articles {
  constructor() {
    this.View = new View();
  }

  init() {
    this.artilclesElemList = document.querySelectorAll('.js-item__content');
  }

  renderDescription(dataArr, start = 0) {
    const htmlList = dataArr.map((data) => data.description);
    this.artilclesElemList = document.querySelectorAll('.js-item__content');
    for (let i = 0; i < htmlList.length; i += 1) {
      View.addText(this.artilclesElemList[start + i], htmlList[i], '.item__text');
    }
  }
}
