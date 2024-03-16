import { css, html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { serverPath } from './rest';
import { Session } from "./models/session";
import { BookItems } from "./models/book-items";


@customElement("book-items")
export class BookItemsElement extends LitElement {
  @property()
  path: string = "";

  @state()
  session?: Session;

  @state()
  bookItems?: BookItems;

  static properties = {
    bookItems: { type: Object },
    session: {type: Object}
  };  

  _fetchSession() {
    fetch(serverPath("/sessions"))
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
        return null;
      })
      .then((json: unknown) => {
          if (json) {
            this.session =  json as Session;
            if (this.path) {
              this._fetchData(this.path);        
            }
          }
      });
  }

_fetchData(path: string) {
    fetch(serverPath(path))
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
        return null;
      })
      .then((json: unknown) => {
          if (json) {
            this.bookItems = json as BookItems;
            console.log(this.bookItems);
          }
      });
  }

  connectedCallback() {

    console.log("In bookitems connectedcallback");

    this._fetchSession();
    super.connectedCallback();
  }  

  render() {
    return html`
        ${this.bookItems?.map((book) =>
          html`<book-item path="/bookitem/${book.bookid}"></book-item>`
        )}
    ` ;
  }

  attributeChangedCallback(
    name: string,
    oldValue: string,
    newValue: string
    ) {
    if (name === "path" && oldValue !== newValue && oldValue) {
        this._fetchData(newValue);
    }
    super.attributeChangedCallback(name, oldValue, newValue);
  } 
}
