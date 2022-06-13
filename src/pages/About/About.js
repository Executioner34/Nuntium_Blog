import View from '../../view';

import './_about.scss';

export default class About {
  constructor() {
    this.View = new View();
    this.root = document.getElementById('main');
  }

  renderAbout(ctx) {
    this.root.innerHTML = View.render('about', ctx);
    this.contentText = this.root.querySelector('.js-content__text');
    this.addContentText(ctx.about.content);
  }

  addContentText(html) {
    this.contentText.innerHTML = html;
  }
}
