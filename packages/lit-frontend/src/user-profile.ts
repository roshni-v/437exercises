//  src/user-profiles.ts
// import { css, html, LitElement } from "lit";
// import { customElement, property, state } from "lit/decorators.js";
// import { Profile } from "./models/profile";
// import { serverPath } from './rest';
// import '/src/components/toggle-switch.ts';
// import '/styles/page.css';
// import '/src/dark-mode.ts'

// @customElement("user-profile")
// export class UserProfileElement extends LitElement {
//   @property()
//   path: string = "";

//   @state()
//   profile?: Profile;

//   static properties = {
//     profile: { type: Object }
//   };  

//   render() {
//     return html`
//       <article>
//         <header>
//           <p><a href="home.html">Home</a> > Account</p>
//           <h1>Account</h1>
//         </header>
//         <section class="grid-container">
//           <div class="grid-item">
//             <h2>Name: </h2><p>${this.profile ? this.profile.name : ''}</p>
//             <h2>Email: </h2><p>${this.profile ? this.profile.email : ''}</p>
//             <h2>Dark Mode: </h2>
//             <toggle-switch .checked=${this.profile ? this.profile.darkmode : false}></toggle-switch>
//           </div>
//         </section>
//       </article>
//     `;
//   }

//   static styles = css`...`;

//   _fetchData(path: string) {
//     fetch(serverPath(path))
//       .then((response) => {
//         if (response.status === 200) {
//           return response.json();
//         }
//         return null;
//       })
//       .then((json: unknown) => {
//           if (json) this.profile = json as Profile;
//       });
//   }

//   connectedCallback() {
//     if (this.path) {
//       this._fetchData(this.path);
//     }
//     super.connectedCallback();
//   }  

//   attributeChangedCallback(
//     name: string,
//     oldValue: string,
//     newValue: string
//     ) {
//     if (name === "path" && oldValue !== newValue && oldValue) {
//         this._fetchData(newValue);
//     }
//     super.attributeChangedCallback(name, oldValue, newValue);
//     }  
// }

// @customElement("user-profile-edit")
// export class UserProfileEditElement extends UserProfileElement {
//   render() {
//     return html`
//       <form @submit=${this._handleSubmit}>
//         <article>
//           <header>
//             <p><a href="home.html">Home</a> > Account</p>
//             <h1>Account</h1>
//           </header>
//           <section class="grid-container">
//             <div class="grid-item">
//               <h2>Name: </h2><input type="text" name="name" .value=${this.profile ? this.profile.name : ''}>
//               <h2>Email: </h2><input type="text" name="email" .value=${this.profile ? this.profile.email : ''}>
//               <h2>Dark Mode: </h2>
//               <toggle-switch .checked=${this.profile ? this.profile.darkmode : false}></toggle-switch>
//             </div>
//           </section>
//         </article>
//         <button type="submit">Submit Changes</button>
//       </form>
//     `;
//   }

//   static styles = css`
//   `;

//   _putData(json: Profile) {
//     fetch(serverPath(this.path), {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(json)
//     })
//       .then((response) => {
//         if (response.status === 200) return response.json();
//         else return null;
//       })
//       .then((json: unknown) => {
//         if (json) this.profile = json as Profile;
//       })
//       .catch((err) =>
//         console.log("Failed to PUT form data", err)
//       );
//   }

//   _handleSubmit(ev: Event) {
//     ev.preventDefault(); // prevent browser from submitting form data itself

//     const target = ev.target as HTMLFormElement;
//     const formdata = new FormData(target);
//     const entries = Array.from(formdata.entries())
//       .map(([k, v]) => (v === "" ? [k] : [k, v]))
//       .map(([k, v]) =>
//         k === "airports"
//           ? [k, (v as string).split(",").map((s) => s.trim())]
//           : [k, v]
//       );
//     const json = Object.fromEntries(entries);

//     this._putData(json);
//   }

// }

import { css, html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { Profile } from "./models/profile";
import { serverPath } from './rest';
import '/src/components/toggle-switch.ts';
import '/styles/page.css';
import '/src/dark-mode.ts'
import { Session } from "./models/session";

@customElement("user-profile")
export class UserProfileElement extends LitElement {
  @property()
  path: string = "";

  @state()
  session?: Session;

  @state()
  profile?: Profile;

  static properties = {
    profile: { type: Object },
    session: { type: Object}
  };  

  render() {
    return html`
      <article>
        <header>
          <p><a href="home.html">Home</a> > Account</p>
          <h1>Account</h1>
        </header>
        <section class="grid-container">
          <div class="grid-item">
            <h2>Name: </h2><p>${this.profile ? this.profile.name : ''}</p>
            <h2>Email: </h2><p>${this.profile ? this.profile.email : ''}</p>
            <h2>Dark Mode: </h2>
            <toggle-switch .checked=${this.profile ? this.profile.darkmode : false}></toggle-switch>
          </div>
        </section>
      </article>
    `;
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

  `;

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
            this.path = "/profiles/" + this.session?.userid;
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
            this.profile = json as Profile;
            console.log(this.profile);
          }
      });
  }

  connectedCallback() {
    console.log("In connected callback");

    this._fetchSession();
    super.connectedCallback();
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

@customElement("user-profile-edit")
export class UserProfileEditElement extends UserProfileElement {
  render() {

    return html`
      <form @submit=${this._handleSubmit}>
        <article>
          <header>
            <p><a href="home.html">Home</a> > Account</p>
            <h1>Account</h1>
          </header>
          <section>
              <h2>Name: </h2><input type="text" name="name" .value=${this.profile ? this.profile.name : ''}>
              <h2>Email: </h2><input type="text" name="email" .value=${this.profile ? this.profile.email : ''}>
              <h2>Dark Mode: </h2>
              <toggle-switch .checked=${this.profile ? this.profile.darkmode : false}></toggle-switch>
              <button type="submit">Submit Changes</button>
          </section>
        </article>
      </form>
    `;
  }

  static styles = UserProfileElement.styles;

  _putData(json: Profile) {
    fetch(serverPath(this.path), {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(json)
    })
      .then((response) => {
        if (response.status === 200) return response.json();
        else return null;
      })
      .then((json: unknown) => {
        if (json) this.profile = json as Profile;
      })
      .catch((err) =>
        console.log("Failed to PUT form data", err)
      );
  }

  _handleSubmit(ev: Event) {

    console.log("profile:" + this.profile);

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