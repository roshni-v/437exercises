import { css, html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { serverPath } from './rest';
import { UserList } from "./models/user-list";
import { Session } from "./models/session";
import { v4 as uuidv4 } from 'uuid';
import { BookItem } from "./models/book-item";


@customElement("user-list")
export class UserListElement extends LitElement {
  @property()
  path: string = "";
  listid: string = "";

  @state()
  showAddBook: boolean = false;

  @state()
  session?: Session;

  @state()
  userList?: UserList;

  static properties = {
    userList: { type: Object },
    showAddBook: {type: Boolean},
    listid: {type: String}
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
            this.userList = json as UserList;
            this.listid = this.userList.listid;
          }
      });
  }
  

  connectedCallback() {

    console.log("In userlist connectedcallback");
    console.log(serverPath(this.path));
  
    if (this.path) {
      this._fetchData(this.path);
    }
    super.connectedCallback();
  }  

  render() {
    return this.userList?
      this.showAddBook?
        html`
        <list-card>
          <h2 slot="title" class="float-child-left">${this.userList ? this.userList.title : ''}</h2>
          <ul>  
            <book-items path="${this.path}/bookitems"></book-items> 
          </ul>
          <div>
            <button type="submit" class="float-child-left" @click=${this._handleAddBook}>Add A Book</button>
            <button type="submit" class="float-child-left" @click=${this._handleDeleteList}>Delete This List</button>
          </div>
        </list-card>
        <book-item-create path="${this.path}/bookitems" listid="${this.userList.listid}"></book-item-create>
      `:     
        html`
          <list-card>
              <h2 slot="title" class="float-child-left">${this.userList ? this.userList.title : ''}</h2>
              <ul>  
                <book-items path="${this.path}/bookitems"></book-items> 
              </ul>
              <div>
                <button type="submit" class="float-child-left" @click=${this._handleAddBook}>Add A Book</button>
                <button type="submit" class="float-child-left" @click=${this._handleDeleteList}>Delete This List</button>
              </div>
          </list-card>
        `:
      html``  ;
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

_handleDeleteList(ev: Event) {

  ev.preventDefault(); // prevent browser from submitting form data itself

  fetch(serverPath(this.path), {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => {
      if (response.status === 200) return response.json();
      else return null;
    })
    .then((json: unknown) => {
      this.userList = null;
    })
    .catch((err) =>
      console.log("Failed to DELETE list", err)
    );
  }


  _handleAddBook(ev: Event) {
    this.showAddBook = true;
  }
}

@customElement("book-item-create")
export class BookItemCreateElement extends UserListElement {

  @property()
  path: string = "";
  title: string = "";
  author: string = "";

  @state()
  showAddBook: boolean = false;

  @state()
  userList?: UserList;

  render() {
    /*
    return html`
      <form @submit=${this._handleSubmit}>
        <article>
        <section>
            <div>
              <h2>Title: </h2><input type="text" name="title" id="booktitle">
              <button type="submit" class="float-child-left" @click=${this._handleSearch}>Search Book</button>
            </div>
            <h2>Author: </h2><input type="text" name="author" id="bookauthor">
            </h2>
            <div>
            <button type="submit">Add Book</button>
            </div>
        </section>
        </article>
      </form>
    ` ;
    */
    return html`
    <form @submit=${this._handleSubmit}>
      <article>
      <section>
          <div>
            <h2>Title: </h2><input type="text" name="title" .value=''>
          </div>
          <h2>Author: </h2><input type="text" name="author" .value=''>
          </h2>
          <div>
          <button type="submit">Add Book</button>
          </div>
      </section>
      </article>
    </form>
  ` ;
  }

  static styles = UserListElement.styles;

  _putData(json: BookItem) {
    json.bookid = uuidv4();
    json.listid = this.listid;

    fetch(serverPath(this.path), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(json)
    })
      .then((response) => {
        if (response.status === 200) return response.json();
        else return null;
      })
      .then((json: unknown) => {
        this.showAddBook = false;
      })
      .catch((err) =>
        console.log("Failed to POST form data", err)
      );
  }

  _handleSubmit(ev: Event) {

    ev.preventDefault(); // prevent browser from submitting form data itself

    const target = ev.target as HTMLFormElement;
    const formdata = new FormData(target);
    const entries = Array.from(formdata.entries())
      .map(([k, v]) => (v === "" ? [k] : [k, v]))
      .map(([k, v]) =>
        k === "airports"
          ? [k, (v as string).split(",").map((s) => s.trim())]
          : [k, v]
      );
    const json = Object.fromEntries(entries);

    this._putData(json);
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
            this.userList = json as UserList;
          }
      });
  }
  

  connectedCallback() {

    console.log(serverPath(this.path));
  
    if (this.path) {
      this._fetchData(this.path);
    }
    super.connectedCallback();
  }  

/*
  _handleSearch(ev: Event) {

    const booktitle = this.shadowRoot.getElementById('booktitle');

    if (booktitle) {
        fetch(serverPath("/book/title/") + booktitle.value, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => {
          if (response.status === 200) return response.json();
          else return null;
        })
        .then((json: unknown) => {
          console.log(json);
          this.shadowRoot.getElementById('bookauthor').value = json.author;
        })
        .catch((err) =>
          console.log("Failed to GET book", err)
        );
    }
    
  }
  */
}
