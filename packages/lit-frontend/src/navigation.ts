import { css, html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { Session } from "./models/session";
import { serverPath } from './rest';


@customElement("navigation")
export class NavigationElement extends LitElement {
  @property()
  path: string = "";

  @state()
  session?: Session;

  static properties = {
    session: { type: Object }
  };  

  /*
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
            this.session = json as Session;
          }
      });
  }
  */

  connectedCallback() {

    console.log("In connectedcallback");
    console.log(serverPath(this.path));
    /*
    if (this.path) {
      this._fetchData(this.path);
    }
    */
    super.connectedCallback();
  }  

  render() {

    /*
    return (this.session)
    ? html`
    <article>
    <header>
        <h1>
            <svg class="icon">
                <use href="/icons/office.svg#icon-pin" />
            </svg>
            Home
            <drop-down style="float: right">
                <svg class="icon">
                    <use href="/icons/office.svg#icon-profile" />
                </svg>
                <div slot="menu">  
                    <a href="account.html">Account</a>
                    <a href="http://localhost:3000/signout">Logout</a>
                </div>
            </drop-down> 
        </h1>
    </header>  
    <add-new-button>
        <h2 slot="title">Add New List</h2>
    </add-new-button>          
    <section class="grid-container">
        <list-card>
            <h2 slot="title">Authors I Like</h2>                                                      
            <ul>
                <list-card-component><a href="oscar_wilde.html">Oscar Wilde</a></list-card-component>
            </ul>
        </list-card>
        <list-card>
            <h2 slot="title">Books I Like Books I Like Books I Like Books I Like Books I Like Books I Like</h2>                                                            
            <ul>
                <list-card-component><a href="the_picture_of_dorian_gray.html">The Picture of Dorian Gray Gray Gray Gray Gray Gray Gray Gray Gray Gray Gray Gray Gray Gray Gray</a></list-card-component>
                <list-card-component><a href="the_picture_of_dorian_gray.html">The</a></list-card-component>
                <list-card-component><a href="the_picture_of_dorian_gray.html">Picture</a></list-card-component>
                <list-card-component><a href="the_picture_of_dorian_gray.html">of</a></list-card-component>
                <list-card-component><a href="the_picture_of_dorian_gray.html">Dorian</a></list-card-component>
                <list-card-component><a href="the_picture_of_dorian_gray.html">Gray</a></list-card-component>
            </ul>
        </list-card>   
        <list-card>
            <h2 slot="title">Eras of Interest Eras of Interest Eras of Interest Eras of Interest</h2>                                                
        </list-card>   
        <list-card>
            <h2 slot="title">Eras of Interest</h2>                                                      
            <ul>
                <list-card-component><a href="1980s.html">1980s</a></list-card-component>
            </ul>
        </list-card>                                             
    </section>
    </article>
    ` :
    html`
    <article class="intro">
    <h1 class="webapp_name" style="color: #14315C">Well Read</h1>
    <h1 style="color: #14315C">A classic novels web app.</h1> 
    <h1 style="color: #14315C">Peruse available authors and books.</h1> 
    <h1 style="color: #14315C">Make lists to organize your thoughts.</h1>
    <h1 style="color: #14315C">Read and virtually annotate.</h1>
    <a href="http://localhost:3000/login"><button>Log In</button></a>
    </article>
    ` ;
    */

    return html`
    <article>Hello</article> ` ;
  }
}
