import { css, html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { serverPath } from './rest';
import { BookItem } from "./models/book-item";


@customElement("book-item")
export class BookItemElement extends LitElement {
  @property()
  path: string = "";

  @state()
  item?: BookItem;

  static properties = {
    session: { type: Object }
  };  


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
            this.item = json as BookItem;
            console.log("book-item" + this.item);
          }
      });
  }


  connectedCallback() {

    console.log("In bookitem connectedcallback");
    console.log(serverPath(this.path));
    
    if (this.path) {
      this._fetchData(this.path);
    }
    super.connectedCallback();
  }  

  render() {

    return html`
        <li>
        <list-card-component>${this.item?.title}</list-card-component>
        </li>
    ` ;
  }

  static styles = css`
  section {
    margin: 2em;
  }

  header {
    background-color: var(--header-background-color);
    text-align: center;
    padding: 1em 0;
  }

  h1 {
    color: var(--text-color);
    font-family: var(--font-family);
  }

  h2 {
    color: var(--h2-color); /* Default color for h2 */
    font-family: var(--font-family);
  }

  a {
    color: var(--link-color);
  }

  /* Dark mode styles */
  body.dark-mode {
    background-color: #333333;
    color: #FFFFFF;
  }

  header.dark-mode {
    background-color: #2B2B2B;
  }

  h2.dark-mode {
    color: #808080;
  }

  a.dark-mode {
    color: #D4AF37;
  }

  button.dark-mode {
    color: #ffffff;
    border-color: #ffffff;
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
  
  .parent {
    background: mediumpurple;
    padding: 1rem;
  }
  .child {
    border: 1px solid indigo;
    padding: 1rem;
  }

  .padding1rem{
    padding: 1rem;

  }

  .float-left-child {
    float: left;
  }

  li {
    display: block
  }
`;
}
