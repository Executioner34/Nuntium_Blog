import View from '../../view';

import './_article.scss';

export default class Article {
  constructor() {
    this.View = new View();
    this.root = document.getElementById('main');
  }

  renderArticle(ctx) {
    this.root.innerHTML = View.render('article', ctx);
    this.articleTextElem = this.root.querySelector('.text-content__text');
    ctx.description = Article.addBrInHTML(ctx.description);
    this.articleTextElem.innerHTML = ctx.description;
    this.checkAndHideBlock(ctx);
    window.scrollTo(0, 0);
  }

  static addBrInHTML(text) {
    const arr = text.split('</p>').join('</p> <br>');
    return arr;
  }

  checkAndHideBlock(data) {
    if (data.prevId === null) {
      const elem = this.root.querySelector('.js-pagination__prev');
      elem.classList.add('hide');
      return;
    }
    if (data.nextId === null) {
      const elem = this.root.querySelector('.js-pagination__next');
      elem.classList.add('hide');
    }
  }
}
