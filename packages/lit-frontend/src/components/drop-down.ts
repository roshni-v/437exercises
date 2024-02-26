import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import "/styles/page.css";

@customElement("drop-down")
export class DropDownElement extends LitElement {

  @property({ reflect: true, type: Boolean })
  open: boolean = false;

  @property()
  align: "left" | "right" = "right";

  private _items: { [key: string]: string } = {};

  @property()
  get items(): { [key: string]: string } {
    return this._items;
  }
  set items(value: string) {
    this._items = JSON.parse(value); //parses into a dictionary
  }

  render() {
    const menuStyle =
    "--position-left: auto; --position-right: 0; background-color: rgba(255, 255, 255, 0.8); border-radius: 0.2em";
    
    const menuItemStyle = 
      "color: #855800; text-decoration: none; border-bottom: 0.1px solid #855800;"
  
    return html`
      <input
        type="checkbox"
        id="is-shown"
        @change=${this._handleChange}
        .checked=${this.open} />
      <label for="is-shown">
        <slot>Menu</slot>
      </label>
      <slot name="menu" style=${menuStyle}>
      <ul>
        ${Object.entries(this._items).map(([key, value]) => {
          return html`<li><a style=${menuItemStyle} href="/app/${value}">${key}</a></li>`;
        })}
      </ul>
      </slot>
    `;
  }

  static styles = css`
    :host {
      --position-left: 0;
      --position-right: auto;

      display: inline-block;
      position: relative;
    }

    #is-shown {
      display: none;
    }

    label {
      cursor: pointer;
    }

    slot[name="menu"] {
      display: none;
      position: absolute;
      top: 100%;
      left: var(--position-left);
      right: var(--position-right);
    }

    #is-shown:checked ~ slot[name="menu"] {
      display: block;
    }

    /* CSS for slotted elements and default slot content */

    ::slotted(ul[slot="menu"]),
    slot[name="menu"] > ul {
      margin: 0;
      padding: 0.25em;
      list-style: none;
      white-space: nowrap;
    }
  `;

  _handleChange(ev: InputEvent) {
    const target = ev.target as HTMLInputElement;
    this._toggle(target.checked);
  }

  _toggle(open: boolean) {
    this.open = open;
    this._toggleClickAway(open);
  }

  _toggleClickAway(open: boolean) {
    const clickawayHandler = (ev: Event) => {
      if (!ev.composedPath().includes(this)) {
        this._toggle(false);
      } else {
        ev.stopPropagation();
      }
    };

    if (open) {
      document.addEventListener("click", clickawayHandler);
    } else {
      document.removeEventListener("click", clickawayHandler);
    }
  }
}