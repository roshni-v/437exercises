import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('list-card')
export class ListCard extends LitElement {

  @property({ type: String }) title = '';

  private _items: { [key: string]: string } = {};

  @property()
  get items(): { [key: string]: string } {
    return this._items;
  }
  set items(value: string) {
    this._items = JSON.parse(value); //parses into a dictionary
  }

  render() {
    return html`
      <slot name="title">
        <h2>${this.title}</h2>
      </slot>
      <div class="scrollable-list">
        <ul>
            <slot></slot>
        </ul>
      </div>
    `;
  }  

  static styles = css`
  :host {
    display: block;
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 16px;
    max-width: 400px;
  }

  .scrollable-list {
    max-height: 10em;
    overflow-y: auto;
  }
`;

}
