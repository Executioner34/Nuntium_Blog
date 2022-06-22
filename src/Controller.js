import Model from './Model';
import Header from './components/Header/header';
import Home from './pages/Home/Home';
import Blog from './pages/Blog/Blog';
import About from './pages/About/About';
import Article from './pages/Article/Article';

import getMinutes from './assets/functions/getMinutes';
import setDate from './assets/functions/setDate';
import getTitleArticle from './assets/functions/getTitleArticle';
import addMetaSEO from './assets/functions/addMetaSEO';
import deleteMetaSEO from './assets/functions/deleteMetaSEO';

export default class Controller {
  constructor() {
    this.Model = new Model();
    this.Header = new Header();
    this.Home = new Home();
    this.Blog = new Blog();
    this.About = new About();
    this.Article = new Article();
    this.showHome = this.showHome.bind(this);
    this.showBlog = this.showBlog.bind(this);
    this.showAbout = this.showAbout.bind(this);
    this.showArticle = this.showArticle.bind(this);
    this.showActiveLink = this.showActiveLink.bind(this);
    this.scroll = this.scroll.bind(this);
    this.onScroll = Controller.throttle(this.scroll, 200);
  }

  async aboutRoute(ctx, next) {
    const about = await this.Model.getAboutData();
    ctx.state.about = about;
    deleteMetaSEO();
    addMetaSEO(about.seo);
    ctx.save();
    next();
  }

  async homeRoute(ctx, next) {
    const blogArticles = await this.Model.getArticlesData();
    let blogFeatured = await this.Model.getFeaturedData();
    blogArticles.map((data) => Controller.fixData(data));
    blogFeatured = Controller.fixDataFeatured(blogFeatured);
    ctx.state.articles = blogArticles;
    ctx.state.featured = blogFeatured;
    deleteMetaSEO();
    ctx.save();
    next();
  }

  async articlesRoute(ctx, next) {
    const blogArticles = await this.Model.getArticlesData();
    blogArticles.map((data) => Controller.fixData(data));
    ctx.state.articles = blogArticles;
    deleteMetaSEO();
    ctx.save();
    next();
  }

  async blogArticleIdRoute(ctx, next) {
    let blogArticleId = await this.Model.getArticleIdData(ctx.params.id);
    blogArticleId = Controller.fixData(blogArticleId);
    if (blogArticleId.prevId !== null) {
      const prevArticle = await this.Model.getArticleIdData(blogArticleId.prevId);
      blogArticleId.prevTitleArticle = getTitleArticle(prevArticle);
    }
    if (blogArticleId.nextId !== null) {
      const nextArticle = await this.Model.getArticleIdData(blogArticleId.nextId);
      blogArticleId.nextTitleArticle = getTitleArticle(nextArticle);
    }
    ctx.state.articlesId = blogArticleId;
    deleteMetaSEO();
    addMetaSEO({
      title: blogArticleId.seo.title,
      description: blogArticleId.seo.description,
      keywords: blogArticleId.seo.keywords,
    });
    ctx.save();
    next();
  }

  showHome(ctx) {
    this.Home.renderHome(ctx.state);
    document.removeEventListener('scroll', this.onScroll);
    document.removeEventListener('resize', this.onScroll);
  }

  showBlog(ctx) {
    document.addEventListener('scroll', this.onScroll);
    document.addEventListener('resize', this.onScroll);
    this.Blog.counterArticles = 0;
    this.Blog.renderBlog(ctx.state);
  }

  showAbout(ctx) {
    this.About.renderAbout(ctx.state);
    document.removeEventListener('scroll', this.onScroll);
    document.removeEventListener('resize', this.onScroll);
  }

  showArticle(ctx) {
    this.Article.renderArticle(ctx.state.articlesId);
    document.removeEventListener('scroll', this.onScroll);
    document.removeEventListener('resize', this.onScroll);
  }

  showActiveLink(ctx, next) {
    this.Header.showActiveLink(ctx.path);
    next();
  }

  static fixData(ctx) {
    const data = ctx;
    data.readTime = `${getMinutes(data.readTime)} mins`;
    data.createdAt = setDate(data.createdAt);
    return data;
  }

  static fixDataFeatured(ctx) {
    const data = ctx;
    data.readTime = `${getMinutes(data.readTime)} mins`;
    data.createdAt = setDate(data.createdAt);
    return data;
  }

  async scroll() {
    const windowRelativeBottom = document.documentElement.getBoundingClientRect().bottom;
    const windowTop = document.documentElement.clientHeight + 100;
    if (windowRelativeBottom < windowTop) {
      const articlesData = await this.Model.getArticlesData();
      articlesData.map((data) => Controller.fixData(data));
      this.Blog.addArticles(articlesData);
    }
  }

  static throttle(callback, timeout) {
    let timer = null;
    return () => {
      if (timer) return;
      timer = setTimeout(() => {
        callback();
        clearTimeout(timer);
        timer = null;
      }, timeout);
    };
  }
}
