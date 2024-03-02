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
    return html`
    <input
    type="checkbox"
    id="is-shown"
    @change=${this._handleChange}
    .checked=${this.open} />
    <label for="is-shown">
      <slot>Menu</slot>
    </label>
    <slot name="menu">
      <slot></slot>
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
      right: 0; // Changed this line
      border: 1px solid rgba(0, 0, 0, 0.2);
    }

    slot[name="menu"]::slotted(*) {
      white-space: nowrap;
      display: inline-block;
      border-radius: 0.2em;
      padding: 5px;
      background-color: rgb(255, 255, 255);
      border: 1px solid rgba(0, 0, 0, 0.2);
      list-style: none;
    }    

    #is-shown:checked ~ slot[name="menu"] {
      display: block;
    }

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