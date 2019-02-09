const article = 'cool-article';
const articleTemplate = document.createElement('template');

window.ShadyCSS && window.ShadyCSS.prepareTemplate(articleTemplate, article);

class CoolArticle extends HTMLElement {
  constructor() {
    super();
    this._root = this.attachShadow({mode: 'open'});
  }

  connectedCallback() {
    this._render();
  }

  _render() {

    const title = this.getAttribute("title");
    const content = this.getAttribute("content");

      return this._root.innerHTML = `
        <style>
            article {
                border: 1px solid #fff;
            }
            title {
                display: block; 
            }
        </style>
        <article>
            <title>${title}</title>
            ${content}
        </article>
      `}
  
}

window.customElements.define(article, CoolArticle);