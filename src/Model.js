export default class Model {
  constructor() {
    this.BASE_URL = 'https://course.7t33n.ru/rest/v1';
  }

  async callAPI(route) {
    const response = await fetch(this.BASE_URL + route);
    const data = await response.json();
    return data;
  }

  async getAboutData() {
    const data = await this.callAPI('/about/');
    return data;
  }

  async getArticlesData() {
    const data = await this.callAPI('/blog/articles/');
    return data;
  }

  async getArticleIdData(id) {
    const data = await this.callAPI(`/blog/article/${id}`);
    return data;
  }

  async getFeaturedData() {
    const data = await this.callAPI('/blog/featured/');
    return data;
  }
}
