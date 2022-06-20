import Controller from './Controller';

const page = require('page');

export default class Routes {
  constructor() {
    this.Controller = new Controller();
  }

  init() {
    page('*', this.Controller.showActiveLink);
    page(
      '/',
      (ctx, next) => {
        this.Controller.homeRoute(ctx, next);
      },
      this.Controller.showHome,
    );
    page(
      '/about',
      (ctx, next) => {
        this.Controller.aboutRoute(ctx, next);
      },
      this.Controller.showAbout,
    );

    page(
      '/blog',
      (ctx, next) => {
        this.Controller.articlesRoute(ctx, next);
      },
      this.Controller.showBlog,
    );
    page(
      '/blog/article/:id',
      (ctx, next) => {
        this.Controller.blogArticleIdRoute(ctx, next);
      },
      this.Controller.showArticle,
    );

    page();
  }
}
