import './_header.scss';
import View from '../../view';

export default class Header {
  constructor() {
    this.root = document.getElementById('header');
    this.View = new View();
    this.render();
  }

  render() {
    this.root.innerHTML = View.render('header');
    this.navList = this.root.querySelector('.js-nav__list');
  }

  showActiveLink(path) {
    this.removeActiveLink();
    const link = this.navList.querySelector(`[href="${path}"]`);
    if (link) {
      link.classList.add('nav__link--active');
    }
  }

  removeActiveLink() {
    const el = this.navList.querySelector('.nav__link--active');
    if (el) {
      el.classList.remove('nav__link--active');
    }
  }
}
