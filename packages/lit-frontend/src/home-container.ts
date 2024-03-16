import { css, html, LitElement } from 'lit';
import { customElement, property, state } from "lit/decorators.js";


@customElement("home-container")
export class HomeContainerElement extends LitElement {

  @property()
  toggleComponent: Boolean;

  static properties = {
    toggleComponent: { type: Boolean }
  };

  constructor() {
    super();
    this.toggleComponent = false;
  }
  

  connectedCallback() {

    console.log("In container a connectedcallback");
    super.connectedCallback();
  }  

  render() {


    return html`
        <div class="button-container">
            <button @click="${this._handleClick}">
            ${this.toggleComponent?
              html`<slot name=\"title\">View My Lists<slot>`
            :
            html`<svg class=\"icon\" width=\"20\" height=\"20\"><use href=\"/icons/office.svg#x\" /></svg><div><slot name=\"title\">Create New List<slot>"
            `}
            </div>
            </button>
        </div>

      ${this.toggleComponent
      ? html`<user-list-create></user-list-create>`
      : html`<user-lists></user-lists>`}
    `;

  }

  
  _handleClick(ev: Event) {

    this.toggleComponent = !this.toggleComponent;

  }

  static styles = css`
  .icon {
    transform: rotate(45deg);
    fill: var(--svg-color);
  }
  .button-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  button {
    display: flex;
    align-items: center;
    color: var(--link-color);
    text-align: center;
    font-family: var(--font-family);
    display: inline-block;
    margin-top: 30px;
    cursor: pointer;
    background-color: transparent; /* Make the background invisible */
    border: none; /* Make the border invisible */
  }  

  button:hover {
    border-radius: 30px;
    background: radial-gradient(circle at top, rgba(214, 200, 173, 0.3), white);
  }

  button:active {
    border-radius: 30px;
    background: radial-gradient(circle at top, rgba(214, 200, 173, 0.5), white);
  }        

  h2 {
    margin: 0;
  }

`;

  
}

@customElement("view-a")
export class ViewA extends LitElement {
  render() {
    return html`<b>Element A</b>`;
  }

  connectedCallback() {

    console.log("In view a callback");
    super.connectedCallback();
  } 
}

@customElement("view-b")
export class ViewB extends LitElement {
  render() {
    return html`<i>Element B</i>`;
  }

  connectedCallback() {

    console.log("In view b callback");
    super.connectedCallback();
  } 
}

/*
customElements.define('container-el', ContainerElement);
customElements.define('view-a', ViewA);
customElements.define('view-b', ViewB);
*/
