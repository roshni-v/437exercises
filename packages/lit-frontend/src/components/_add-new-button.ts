import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import "/styles/page.css";

@customElement('add-new-button')
export class AddNewButton extends LitElement {
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

  render() {
    return html`
      <div class="button-container">
        <button>
          <svg class="icon" width="20" height="20">
            <use href="/icons/office.svg#x" />
          </svg>
          <slot name="title"><slot>
        </button>
      </div>
    `;
  }
}