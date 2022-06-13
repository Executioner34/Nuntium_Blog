import View from '../../view';
import Banner from '../../components/banner/banner';
import Articles from '../../components/articles/articles';

import './_blog.scss';

export default class Blog {
  constructor() {
    this.View = new View();
    this.Banner = new Banner();
    this.Articles = new Articles();
    this.root = document.getElementById('main');
    this.blogData = {};
    this.counterArticles = 0;
  }

  renderBlog(ctx) {
    this.blogData = {
      bannerData: ctx.articles[0],
      articlesData: ctx.articles.splice(1, ctx.articles.length),
    };
    this.root.innerHTML = View.render('blog', this.blogData);
    this.articlesList = this.root.querySelector('.js-articles__list');
    this.Banner.init();
    this.Articles.init();
    this.Banner.renderDescription(this.blogData.bannerData.description);
    this.Articles.renderDescription(this.blogData.articlesData);
    this.counterArticles += this.blogData.articlesData.length;
  }

  addArticles(data) {
    const articlesHTML = View.render('articles', data);
    this.articlesList.insertAdjacentHTML('beforeend', articlesHTML);
    this.Articles.renderDescription(data, this.counterArticles);
    this.counterArticles += data.length;
  }
}
