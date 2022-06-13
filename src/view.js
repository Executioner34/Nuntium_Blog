import Handlebars from 'handlebars';
import formatText from './assets/functions/formatText';

export default class View {
  constructor() {
    this.data = [];
  }

  static render(nameTmp, data) {
    const templateName = `${nameTmp}Template`;
    const templateElement = document.getElementById(templateName);
    const templateSourse = templateElement.innerHTML;
    const renderFn = Handlebars.compile(templateSourse);
    return data ? renderFn(data) : renderFn();
  }

  static addText(parentElem, html, className = 'banner__text') {
    const elem = document.createElement('p');
    const text = formatText(html);
    elem.classList.add(className);
    elem.innerHTML = text;
    parentElem.appendChild(elem);
  }
}
