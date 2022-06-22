import './_header.scss';
import View from '../../view';

export default class Header {
  constructor() {
    this.root = document.getElementById('header');
    this.body = document.body;
    this.View = new View();
    this.togglePopup = this.togglePopup.bind(this);
    this.closePopupOnClick = this.closePopupOnClick.bind(this);
    this.render();
  }

  render() {
    this.root.innerHTML = View.render('header');
    this.navList = this.root.querySelector('.js-nav__list');
    this.popup = this.root.querySelector('.js-popup');
    this.btnMobileElem = this.root.querySelector('.js-nav__btn--mobile');
    this.headerLink = this.root.querySelector('.js-header__link');
    this.btnMobileElem.addEventListener('click', this.togglePopup);
    this.headerLink.addEventListener('click', this.closePopupOnClick);
  }

  showActiveLink(path) {
    this.removeActiveLink();
    const link = this.navList.querySelector(`[href="${path}"]`);
    if (link) {
      link.classList.add('nav__link--active');
    }
    this.cloneLinksListElem = this.navList.cloneNode(true);
  }

  removeActiveLink() {
    const el = this.navList.querySelector('.nav__link--active');
    if (el) {
      el.classList.remove('nav__link--active');
    }
  }

  togglePopup(e) {
    e.preventDefault();
    this.popupChildCleaner();
    this.popup.classList.toggle('popup--active');
    this.body.classList.toggle('noscroll');
    this.popup.appendChild(this.cloneLinksListElem);
    const links = Array.from(this.popup.children);
    links.forEach((elem) => {
      elem.addEventListener('click', this.closePopupOnClick);
    });
  }

  popupChildCleaner() {
    const popupChildNodes = this.popup.childNodes;
    popupChildNodes.forEach((elem) => elem.remove());
  }

  closePopupOnClick() {
    this.popup.classList.remove('popup--active');
    this.body.classList.remove('noscroll');
  }
}
