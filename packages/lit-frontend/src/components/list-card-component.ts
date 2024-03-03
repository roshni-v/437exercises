import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import "/styles/page.css";

@customElement('list-card-component')
export class ListCardComponent extends LitElement {
  @property({ type: String }) item = '';

  static styles = css`
    .icon {
      vertical-align: middle;
    }
  `;  

  render() {
    return html`
      <li>
        <slot></slot>
        <svg class="icon" width="15" height="15" style="fill: var(--svg-color);">
          <use href="/icons/office.svg#x" />
        </svg>
      </li>
    `;
  }
}