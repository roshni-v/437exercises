import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import '/src/components/drop-down.ts';
import '/styles/page.css';

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
      <div class="list-card-container"> 
        <div class="title-container">
          <div style="margin-right: 20px;">
          <slot name="title">
            <h2 style="color: var(--text-color);">${this.title}</h2>
          </slot>
          </div>
        </div>
        <ul class="list-items">
          <slot></slot>  
      
        </ul>
      </div>
    `;
  }

  static styles = css`
    :host {
      display: block;
      max-width: calc(100% / 3) + "px";
    }

    .list-card-container {
      max-height: 10em;
      overflow-y: auto;
      border: 1px solid #ccc;
      border-radius: 8px;
      padding: 16px;
      margin-bottom: 20px;
      margin-right: 20px;
    }

    .scrollable-list {
      display: block;
      float: left;
    }

    .title-container {
      display: flex;
    }

    .list-items {
      list-style: none;
      padding: 0;
      margin: 0;
    }
  `;
}