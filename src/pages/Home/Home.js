import View from '../../view';
import Banner from '../../components/banner/banner';
import Articles from '../../components/articles/articles';
import Featured from '../../components/featured/featured';

import './_home.scss';

export default class Home {
  constructor() {
    this.data = [];
    this.root = document.getElementById('main');
    this.View = new View();
    this.Banner = new Banner();
    this.Articles = new Articles();
    this.Featured = new Featured();
  }

  renderHome(ctx) {
    const homeCtx = {
      bannerData: ctx.articles[0],
      articlesData: [ctx.articles[1], ctx.articles[2], ctx.articles[3]],
      featuredData: ctx.featured,
    };
    this.root.innerHTML = View.render('home', homeCtx);
    this.Banner.init();
    this.Articles.init();
    this.Banner.renderDescription(homeCtx.bannerData.description);
    this.Articles.renderDescription(homeCtx.articlesData);
  }
}
