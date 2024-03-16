import { css, html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { serverPath } from './rest';
import { UserLists } from "./models/user-lists";
import { Session } from "./models/session";
import { UserList, UserListElement } from "./user-list";
import { v4 as uuidv4 } from 'uuid';


@customElement("user-lists")
export class UserListsElement extends LitElement {
  @property()
  path: string = "";

  @state()
  session?: Session;

  @state()
  userLists?: UserLists;

  static properties = {
    userLists: { type: Object },
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
            this.path = "/user/" + this.session?.userid + "/userlists";
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
            this.userLists = json as UserLists;
            console.log(this.userLists);
          }
      });
  }

  connectedCallback() {

    console.log("In connectedcallback");

    this._fetchSession();
    super.connectedCallback();
  }  

  render() {
  
    return html`
    <article>
      <section>

      ${this.userLists?.map((list) =>
        html`<user-list path="/userlist/${list.listid}"></user-list>`
      )}
      </section>
    </article>
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


  .float-left-child {
    float: left;
  }

`;

}

@customElement("user-list-create")
export class UserListCreateElement extends UserListsElement {
  @property()
  isAdded: boolean = false;

  static properties = {
    isAdded: { type: Boolean },
  };  


  render() {
    return html`
      <form @submit=${this._handleSubmit}>
        <article>
          <section>
              <h2>Title: </h2><input type="text" name="title" .value=''}>
              </h2>
              <div>
                <b>${this.isAdded?
                html`List Added
                `:html``}</b>
                <button type="submit">Create List</button>
              </div>
          </section>
        </article>
      </form>
    ` ;
  }

  static styles = UserListsElement.styles;

  _putData(json: UserList) {
    json.userid = this.session?.userid;
    json.listid = uuidv4();

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
        this.isAdded = true;
      })
      .catch((err) =>
        console.log("Failed to create list", err)
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
}