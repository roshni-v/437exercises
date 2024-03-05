// src/user-profiles.ts
import { css, html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { Profile } from "./models/profile";
import { serverPath } from './rest';

@customElement("user-profile")
export class UserProfileElement extends LitElement {
  @property()
  path: string = "";

  @state()
  profile?: Profile;

  static properties = {
    profile: { type: Object }
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

  static styles = css`...`;

  _fetchData(path: string) {
    fetch(serverPath(path))
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
        return null;
      })
      .then((json: unknown) => {
          if (json) this.profile = json as Profile;
      });
  }

  connectedCallback() {
    if (this.path) {
      this._fetchData(this.path);
    }
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
          <section class="grid-container">
            <div class="grid-item">
              <h2>Name: </h2><input type="text" name="name" .value=${this.profile ? this.profile.name : ''}>
              <h2>Email: </h2><input type="text" name="email" .value=${this.profile ? this.profile.email : ''}>
              <h2>Dark Mode: </h2>
              <input type="checkbox" name="darkmode" .checked=${this.profile ? this.profile.darkmode : false}>
            </div>
          </section>
        </article>
        <button type="submit">Submit</button>
      </form>
    `;
  }

  // static styles = [...UserProfileElement.styles, css`...`];

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